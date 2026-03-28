import prisma from '../lib/prisma';
import { createNotification } from './notification.service';
import { ApplicationInput } from '@/lib/validations';

export async function applyForJob(candidateId: string, jobId: string, applyData: Omit<ApplicationInput, 'jobId'>) {
  const application = await prisma.application.create({
    data: {
      candidateId,
      jobId,
      resumeUrl: applyData.resumeUrl || null,
      coverLetter: applyData.coverLetter || null,
      answers: applyData.answers ? JSON.stringify(applyData.answers) : null,
    }
  });

  const job = await prisma.jobPosting.findUnique({ where: { id: jobId }, include: { employer: { include: { user: true } } } });
  if (job) {
    await createNotification({
      userId: job.employer.user.id,
      message: `New application received for ${job.title}`,
      type: 'APPLICATION_RECEIVED'
    });
  }

  return application;
}

export async function updateApplicationStatus(applicationId: string, employerId: string, status: string) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { job: true, candidate: { include: { user: true } } }
  });

  if (!application || application.job.employerId !== employerId) {
    throw new Error('Unauthorized');
  }

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: { status }
  });

  await createNotification({
    userId: application.candidate.user.id,
    message: `Your application status for ${application.job.title} has updated to ${status}.`,
    type: 'STATUS_UPDATE'
  });

  return updated;
}

export async function getCandidateApplications(candidateId: string) {
  return await prisma.application.findMany({
    where: { candidateId },
    include: {
      job: {
        include: { employer: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}
