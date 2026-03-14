import { NextResponse } from 'next/server';
import { addApplication, getApplications } from '@/lib/data';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    const apps = getApplications();
    return NextResponse.json(apps);
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const experience = formData.get('experience') as string;
        const jobId = formData.get('jobId') as string;
        const resumeFile = formData.get('resume') as File;

        let resumePath = '';

        if (resumeFile) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Create unique filename
            const filename = `${Date.now()}-${resumeFile.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
            const uploadDir = join(process.cwd(), 'public/uploads/resumes');
            const path = join(uploadDir, filename);

            await mkdir(uploadDir, { recursive: true });
            await writeFile(path, buffer);
            resumePath = `/uploads/resumes/${filename}`;
        }

        const application = {
            name,
            email,
            phone,
            experience,
            jobId,
            resume: resumePath, // Save local path
        };

        addApplication(application);

        return NextResponse.json({ success: true, application });
    } catch (error) {
        console.error('Application submission error:', error);
        return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
    }
}
