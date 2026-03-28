import { searchJobs } from "@/services/job.service";
import JobBoard from "@/components/JobBoard";

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
    const prismaJobs = await searchJobs({});
    const jobs = prismaJobs.map((job) => ({
        id: job.id,
        title: job.title,
        location: job.location || 'Remote',
        type: job.jobType,
        salary: (job.salaryMin && job.salaryMax) ? `${job.salaryMin / 100000} - ${job.salaryMax / 100000} LPA` : (job.salaryMax ? `${job.salaryMax / 100000} LPA` : undefined),
        postedAt: job.createdAt.toISOString()
    }));

    return (
        <JobBoard initialJobs={jobs} />
    );
}
