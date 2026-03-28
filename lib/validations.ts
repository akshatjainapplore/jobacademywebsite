import { z } from 'zod';

export const RegisterEmployerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().min(2, 'Company name is required'),
});

export const RegisterCandidateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const JobPostingSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description heavily required'),
  requirements: z.string(),
  salaryMin: z.number().optional().nullable(),
  salaryMax: z.number().optional().nullable(),
  location: z.string().optional().nullable(),
  jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']),
  isRemote: z.boolean(),
  screeningQs: z.string().optional().nullable(),
});

export const ApplicationSchema = z.object({
  jobId: z.string(),
  resumeUrl: z.string().optional().nullable(),
  coverLetter: z.string().optional().nullable(),
  answers: z.string().optional().nullable()
});

export const StatusUpdateSchema = z.object({
  status: z.enum(['APPLIED', 'SCREENED', 'INTERVIEW', 'OFFER', 'REJECTED'])
});

export type RegisterEmployerInput = z.infer<typeof RegisterEmployerSchema>;
export type RegisterCandidateInput = z.infer<typeof RegisterCandidateSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type JobPostingInput = z.infer<typeof JobPostingSchema>;
export type ApplicationInput = z.infer<typeof ApplicationSchema>;
export type StatusUpdateInput = z.infer<typeof StatusUpdateSchema>;
