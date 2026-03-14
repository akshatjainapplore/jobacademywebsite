import { NextResponse } from 'next/server';
import { getJobs, saveJobs } from '@/lib/data';

export async function GET() {
    const jobs = getJobs();
    return NextResponse.json(jobs);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const jobs = getJobs();

        // Create new job
        const newJob = {
            id: Date.now().toString(),
            status: 'active',
            postedAt: new Date().toISOString(),
            ...body
        };

        jobs.push(newJob);
        saveJobs(jobs);

        return NextResponse.json({ success: true, job: newJob });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
