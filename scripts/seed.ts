import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding demo users...');
  
  const passwordHash = await bcrypt.hash('DemoPassword123!', 10);

  // 1. Admin
  await prisma.user.upsert({
    where: { email: 'admin@jobacademy.com' },
    update: {},
    create: {
      email: 'admin@jobacademy.com',
      passwordHash,
      role: 'ADMIN',
    }
  });
  console.log('Created Admin: admin@jobacademy.com');

  // 2. Employer
  await prisma.user.upsert({
    where: { email: 'employer@jobacademy.com' },
    update: {},
    create: {
      email: 'employer@jobacademy.com',
      passwordHash,
      role: 'EMPLOYER',
      companyProfile: {
        create: {
          companyName: 'Tech Innovators Inc.',
          description: 'A leading tech company looking for talent.'
        }
      }
    }
  });
  console.log('Created Employer: employer@jobacademy.com');

  // 3. Candidate
  await prisma.user.upsert({
    where: { email: 'candidate@jobacademy.com' },
    update: {},
    create: {
      email: 'candidate@jobacademy.com',
      passwordHash,
      role: 'CANDIDATE',
      candidateProfile: {
        create: {
          firstName: 'Jane',
          lastName: 'Doe',
          skills: 'React, Node, TypeScript'
        }
      }
    }
  });
  console.log('Created Candidate: candidate@jobacademy.com');

  console.log('Seeding complete! Password for all is: DemoPassword123!');
}

seed()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());
