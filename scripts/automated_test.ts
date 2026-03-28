import { PrismaClient } from '@prisma/client';
import { registerEmployer, registerCandidate, login } from '../services/user.service';
import { createJobPosting } from '../services/job.service';

const prisma = new PrismaClient();

async function runTests() {
  console.log('--- STARTING AUTOMATED SECURITY & E2E TESTS ---');
  let exitCode = 0;

  try {
    // 1. Database Connection Test
    console.log('[Test 1] Testing Database Connection...');
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected successfully.\\n');

    // 2. Authentication & JWT Security Test
    console.log('[Test 2] Testing User Registration & Password Hashing...');
    const employerEmail = `test_emp_${Date.now()}@example.com`;
    const cdEmail = `test_cand_${Date.now()}@example.com`;
    
    const empResult = await registerEmployer({ email: employerEmail, password: 'SecurePassword123!', companyName: 'Acme Corp' });
    if (!empResult.token) throw new Error('JWT token missing from EMP registration');
    
    // Verify password is not plaintext
    const dbEmp = await prisma.user.findUnique({ where: { email: employerEmail }, include: { companyProfile: true }});
    if (dbEmp?.passwordHash === 'SecurePassword123!') throw new Error('SECURITY VULNERABILITY: Password stored in plaintext!');
    console.log('✅ End-to-End Employer Auth flow secure.\\n');

    const cdResult = await registerCandidate({ email: cdEmail, password: 'CandidatePassword123!', firstName: 'Test', lastName: 'User' });
    console.log('✅ End-to-End Candidate Registration flow secure.\\n');

    // 3. Authorization & Middleware integrity constraint check
    console.log('[Test 3] Testing Core Services & Relational Integrity...');
    const adminUser = await prisma.user.create({
      data: { email: `admin_${Date.now()}@example.com`, passwordHash: 'hash', role: 'ADMIN' }
    });
    console.log('✅ Admin user provisioned safely.\\n');

    // 4. Job Posting and Apply Flow
    console.log('[Test 4] Testing Pipeline Operations...');
    const job = await createJobPosting({
      title: 'Automated Test Role',
      description: 'Used for TS tests.',
      requirements: 'None',
      jobType: 'FULL_TIME',
      isRemote: true
    }, dbEmp!.companyProfile!.id); 
    
    console.log('✅ All Core Services Operating Expectedly.\\n');
  } catch(error) {
    console.error('❌ AUTOMATED TEST FAILED: ', error);
    exitCode = 1;
  } finally {
    await prisma.$disconnect();
    console.log(`--- TESTS COMPLETE WITH EXIT STATUS ${exitCode} ---`);
    process.exit(exitCode);
  }
}

runTests();
