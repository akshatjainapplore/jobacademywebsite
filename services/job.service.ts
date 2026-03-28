import prisma from '../lib/prisma';
import { JobPostingInput } from '@/lib/validations';

export async function createJobPosting(data: JobPostingInput, employerId: string) {
  return await prisma.jobPosting.create({
    data: {
      ...data,
      employerId,
    }
  });
}

export async function updateJobPosting(jobId: string, employerId: string, data: Partial<JobPostingInput>) {
  const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
  if (!job || job.employerId !== employerId) throw new Error('Unauthorized');
  
  return await prisma.jobPosting.update({
    where: { id: jobId },
    data,
  });
}

export async function getJobsByEmployer(employerId: string) {
  return await prisma.jobPosting.findMany({
    where: { employerId },
    include: {
      _count: {
        select: { applications: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function searchJobs(filters: { location?: string; isRemote?: boolean; jobType?: string }) {
  const where: any = { status: 'OPEN' };
  
  if (filters.location) {
    where.location = { contains: filters.location };
  }
  if (filters.isRemote !== undefined) {
    where.isRemote = filters.isRemote;
  }
  if (filters.jobType) {
    where.jobType = filters.jobType;
  }
  
  return await prisma.jobPosting.findMany({
    where,
    include: {
      employer: true,
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getJobById(jobId: string) {
  return await prisma.jobPosting.findUnique({
    where: { id: jobId },
    include: {
      employer: true,
      applications: true, 
    }
  });
}

export async function getAllJobs() {
  return await prisma.jobPosting.findMany({
    include: { employer: true, _count: { select: { applications: true } } },
    orderBy: { createdAt: 'desc' }
  });
}
