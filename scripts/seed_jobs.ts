import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Fetching employer profile...');
    const user = await prisma.user.findUnique({
        where: { email: 'employer@jobacademy.com' },
        include: { companyProfile: true }
    });

    if (!user || !user.companyProfile) {
        throw new Error('Fallback Employer account missing. Cannot attach job.');
    }

    console.log('Injecting Business Head role...');
    const job = await prisma.jobPosting.create({
        data: {
            title: 'Business Head',
            description: `**Client: Nirmals Furnishings**\n\nThis is a leadership role with end-to-end responsibility for business performance, including revenue growth, profitability, and team management. The Business Head will be responsible for defining and executing overall business strategy, driving sales across channels, and ensuring sustainable growth.\n\nThe role involves owning the P&L, monitoring key financial metrics, and making strategic decisions to improve margins and efficiency. The candidate will lead cross-functional teams including sales, operations, and support functions, ensuring alignment with business objectives.\n\nA key responsibility is to drive revenue through multiple channels — retail, B2B (architects/designers), and partnerships — while identifying new growth opportunities and expanding market presence. Strong focus on execution, team performance, and target achievement is critical.\n\nThe role also requires process optimization, team building, and leadership, ensuring that systems and teams are scalable as the business grows. Regular reporting to top management and involvement in strategic planning will be part of the role.`,
            requirements: `The ideal candidate should have strong experience in business leadership, preferably in retail, furnishings, or related industries, with proven ability to manage teams, drive revenue, and take ownership of business outcomes in a fast-paced environment.`,
            location: '3/4, Furniture Block, Kirti Nagar Industrial Area, New Delhi, Delhi',
            salaryMin: 1200000,
            salaryMax: 1600000,
            jobType: 'FULL_TIME',
            isRemote: false,
            employerId: user.companyProfile.id,
            status: 'OPEN'
        }
    });

    console.log(`Successfully mapped Job Insertion ID: ${job.id}`);
}

main().catch(console.error).finally(async () => {
    await prisma.$disconnect();
});
