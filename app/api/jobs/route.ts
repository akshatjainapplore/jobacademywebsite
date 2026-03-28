import { NextResponse } from 'next/server';
import { getAllJobs } from '@/services/job.service';
import { verifyToken } from '@/services/auth.service';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        
        const payload = await verifyToken(token);
        if (!payload || payload.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 });
        }

        const jobs = await getAllJobs();
        
        // Map to exact schema expected by the frontend Admin Jobs table
        const mappedJobs = jobs.map((job) => ({
            id: job.id,
            title: job.title,
            location: job.location || (job.isRemote ? 'Remote' : 'Not Specified'),
            type: job.jobType,
            status: job.status.toLowerCase(),
            postedAt: job.createdAt.toISOString()
        }));

        return NextResponse.json(mappedJobs);
    } catch (error: any) {
        console.error('Failed to fetch jobs natively:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
