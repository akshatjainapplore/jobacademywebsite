import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old jobs...');
    const result = await prisma.jobPosting.deleteMany({});
    console.log(`Cleared ${result.count} JobPostings from Prisma database.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
