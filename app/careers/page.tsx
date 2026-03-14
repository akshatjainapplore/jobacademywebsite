import { getActiveJobs } from "@/lib/data";
import JobBoard from "@/components/JobBoard";

export default function CareersPage() {
    const jobs = getActiveJobs();

    return (
        <JobBoard initialJobs={jobs} />
    );
}
