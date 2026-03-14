import { NextResponse } from 'next/server';
import { getJobById, getJobs, saveJobs } from '@/lib/data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = getJobById(id);
    if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json(job);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const jobs = getJobs();

        const jobIndex = jobs.findIndex((j: any) => j.id === id);
        if (jobIndex === -1) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        // Update job fields
        jobs[jobIndex] = { ...jobs[jobIndex], ...body };
        saveJobs(jobs);

        return NextResponse.json({ success: true, job: jobs[jobIndex] });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const jobs = getJobs();

        const jobIndex = jobs.findIndex((j: any) => j.id === id);
        if (jobIndex === -1) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        // Remove job. Alternatively, could set status to 'deleted'.
        jobs.splice(jobIndex, 1);
        saveJobs(jobs);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
