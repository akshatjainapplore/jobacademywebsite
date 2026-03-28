import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const firstName = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const experience = formData.get('experience') as string;
        const jobId = formData.get('jobId') as string;
        const resumeFile = formData.get('resume') as File;

        if (!email || !firstName || !jobId) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        let resumePath = '';
        if (resumeFile) {
            const bytes = await resumeFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const ext = resumeFile.name.split('.').pop()?.toLowerCase();
            const allowed = ['pdf', 'doc', 'docx'];
            if (!ext || !allowed.includes(ext)) return NextResponse.json({ error: 'Invalid file format. Only PDF/DOC allowed.'}, { status: 400 });

            const filename = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
            const uploadDir = join(process.cwd(), 'public/uploads/resumes');
            const path = join(uploadDir, filename);

            await mkdir(uploadDir, { recursive: true });
            await writeFile(path, buffer);
            resumePath = `/uploads/resumes/${filename}`;
        }

        // Dynamically find or create the Candidate account
        let user = await prisma.user.findUnique({ where: { email }, include: { candidateProfile: true } });
        let candidateProfileId: string;

        if (!user) {
            const passwordHash = await bcrypt.hash(Date.now().toString(), 10); // Random generated password for guest applicants
            user = await prisma.user.create({
                data: {
                    email,
                    passwordHash,
                    role: 'CANDIDATE',
                    candidateProfile: {
                        create: {
                            firstName: firstName.split(' ')[0],
                            lastName: firstName.split(' ').slice(1).join(' ') || 'Candidate',
                            experience: experience || '',
                            latestCvUrl: resumePath || null
                        }
                    }
                },
                include: { candidateProfile: true }
            });
            candidateProfileId = user.candidateProfile!.id;
        } else {
            if (!user.candidateProfile) {
                const newProfile = await prisma.candidateProfile.create({
                    data: {
                        userId: user.id,
                        firstName: firstName.split(' ')[0],
                        lastName: firstName.split(' ').slice(1).join(' ') || '',
                    }
                });
                candidateProfileId = newProfile.id;
            } else {
                candidateProfileId = user.candidateProfile.id;
            }
        }

        // Check if already applied
        const existingApp = await prisma.application.findUnique({
            where: { candidateId_jobId: { candidateId: candidateProfileId, jobId } }
        });
        if (existingApp) return NextResponse.json({ error: 'You have already applied for this job.' }, { status: 400 });

        const application = await prisma.application.create({
            data: {
                candidateId: candidateProfileId,
                jobId,
                resumeUrl: resumePath || null,
                answers: JSON.stringify({ phone, experience })
            }
        });

        return NextResponse.json({ success: true, application });
    } catch (error: any) {
        console.error('Application submission error:', error);
        return NextResponse.json({ error: 'Failed to submit application. ' + error.message }, { status: 500 });
    }
}
