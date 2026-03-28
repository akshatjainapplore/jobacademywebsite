import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from './auth.service';
import { RegisterCandidateInput, RegisterEmployerInput, LoginInput } from '@/lib/validations';

export async function registerCandidate({ email, password, firstName, lastName }: RegisterCandidateInput) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already registered');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'CANDIDATE',
      candidateProfile: {
        create: {
          firstName,
          lastName,
        }
      }
    }
  });

  const token = await signToken({ userId: user.id, role: 'CANDIDATE', email: user.email });
  return { user, token };
}

export async function registerEmployer({ email, password, companyName }: RegisterEmployerInput) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already registered');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'EMPLOYER',
      companyProfile: {
        create: {
          companyName,
        }
      }
    }
  });

  const token = await signToken({ userId: user.id, role: 'EMPLOYER', email: user.email });
  return { user, token };
}

export async function login({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');

  const token = await signToken({ userId: user.id, role: user.role as any, email: user.email });
  return { user, token };
}

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      candidateProfile: true,
      companyProfile: true,
    }
  });
  return user;
}
