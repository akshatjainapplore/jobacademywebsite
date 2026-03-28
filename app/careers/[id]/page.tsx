import { getJobById, searchJobs } from '@/services/job.service';
import ApplicationForm from '@/components/ApplicationForm';
import Link from 'next/link';

export default async function JobDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const job = await getJobById(params.id);
    const allJobs = await searchJobs({});
    const otherJobs = allJobs.filter((j: any) => j.id !== params.id).slice(0, 4);

    if (!job) {
        return (
            <main className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1>Job Not Found</h1>
                    <p>The position you are looking for does not exist or has been closed.</p>
                    <Link href="/careers" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                        Back to Careers
                    </Link>
                </div>
            </main>
        );
    }

    const formatDate = (dateString: string) => {
        const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 3600 * 24));
        if (diff === 0) return 'Today';
        return `${diff} days ago`;
    };

    return (
        <main style={{ backgroundColor: 'var(--color-bg-secondary)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>

                {/* Breadcrumbs */}
                <nav style={{ marginBottom: '2.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    <Link href="/" style={{ color: 'var(--color-primary)' }}>Home</Link> /
                    <Link href="/careers" style={{ color: 'var(--color-primary)', marginLeft: '0.5rem' }}>Careers</Link> /
                    <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>{job.title}</span>
                </nav>

                {/* Main Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '3rem' }}>

                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Header Card */}
                        <div className="glass" style={{
                            backgroundColor: 'white',
                            borderRadius: '32px',
                            padding: '3.5rem',
                            boxShadow: '0 20px 60px rgba(0, 82, 255, 0.05)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                                <div>
                                    <h1 style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '0.75rem' }}>{job.title}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.1rem' }}>Job Academy Client</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(0, 82, 255, 0.05)', padding: '4px 12px', borderRadius: '50px', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                                            <span>3.9</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                        </div>
                                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>943 Reviews</span>
                                    </div>
                                </div>
                                <div style={{ width: '80px', height: '80px', border: '1px solid #f1f5f9', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'linear-gradient(45deg, var(--color-primary), #4F86FF)', borderRadius: '50%' }}></div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
                                <span style={{ backgroundColor: '#F1F5F9', color: '#475569', padding: '8px 16px', borderRadius: '20px', fontSize: '1rem', fontWeight: 600 }}>{job.location}</span>
                                <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '8px 16px', borderRadius: '20px', fontSize: '1rem', fontWeight: 600 }}>{job.jobType}</span>
                                <span style={{ backgroundColor: '#F3F4F6', color: '#374151', padding: '8px 16px', borderRadius: '20px', fontSize: '1rem', fontWeight: 600 }}>6 - 11 years</span>
                            </div>

                            {job.salaryMax && (
                                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'black', marginBottom: '2.5rem' }}>
                                    {(job.salaryMin && job.salaryMax) ? `${job.salaryMin / 100000} - ${job.salaryMax / 100000} LPA` : (job.salaryMax ? `${job.salaryMax / 100000} LPA` : 'Not Disclosed')}
                                </div>
                            )}

                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                    Posted: <span style={{ fontWeight: 800, color: 'var(--color-text)' }}>{formatDate(job.createdAt.toISOString())}</span> |
                                    Applicants: <span style={{ fontWeight: 800, color: 'var(--color-text)', marginLeft: '0.25rem' }}>{job.applications ? job.applications.length : 0}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <button className="btn btn-glass btn-pill" style={{ padding: '0.8rem 2.5rem' }}>Save Job</button>
                                    <a href="#apply-now" className="btn btn-primary btn-pill" style={{ padding: '0.8rem 3.5rem' }}>Apply Now</a>
                                </div>
                            </div>
                        </div>

                        {/* Job Highlights */}
                        <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.02)' }}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '2rem' }}>Job highlights</h3>
                            <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 2, fontSize: '1.1rem' }}>
                                <li style={{ marginBottom: '1rem' }}>Collaborate on high-impact strategy and digital transformation initiatives.</li>
                                <li style={{ marginBottom: '1rem' }}>Shape intellectual capital and lead core client-facing projects.</li>
                                <li style={{ marginBottom: '1rem' }}>Requires a strong foundation in consulting or corporate strategy.</li>
                            </ul>
                        </div>

                        {/* Job Description */}
                        <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.02)' }}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: '2rem' }}>Job description</h3>
                            <div style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, fontSize: '1.1rem', whiteSpace: 'pre-line' }}>
                                {job.description}
                                {"\n\n"}
                                <strong style={{ color: 'var(--color-text)' }}>Education:</strong>{"\n"}
                                - UG: Any Graduate in Any Specialization{"\n"}
                                - PG: Any Postgraduate in Any Specialization
                            </div>
                        </div>

                        {/* Application Form */}
                        <div id="apply-now" className="glass" style={{ backgroundColor: 'white', borderRadius: '32px', padding: '4rem', boxShadow: '0 20px 60px rgba(0, 82, 255, 0.05)' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '1rem', textAlign: 'center' }}>Step up to success.</h2>
                            <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Submit your details and our talent experts will reach out.</p>
                            <ApplicationForm jobId={job.id} />
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1.5rem' }}>Jobs you might be interested in</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {otherJobs.map((otherJob: any) => (
                                    <Link href={`/careers/${otherJob.id}`} key={otherJob.id} style={{ textDecoration: 'none', display: 'block' }}>
                                        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1.25rem', cursor: 'pointer' }}>
                                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1F4E8C', marginBottom: '0.5rem', lineHeight: 1.3 }}>{otherJob.title}</h4>
                                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>Job Academy Client</p>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg> 3.5
                                                </span>
                                                <span>|</span>
                                                <span>47185 reviews</span>
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                                <span style={{ backgroundColor: '#F1F5F9', color: '#475569', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{otherJob.location}</span>
                                                <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>{otherJob.jobType}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748b' }}>
                                                {otherJob.salaryMax && (
                                                    <span style={{ fontWeight: 800, color: 'black', fontSize: '0.9rem' }}>{(otherJob.salaryMin && otherJob.salaryMax) ? `${otherJob.salaryMin / 100000} - ${otherJob.salaryMax / 100000} LPA` : (otherJob.salaryMax ? `${otherJob.salaryMax / 100000} LPA` : 'Not Disclosed')}</span>
                                                )}
                                                <span style={{ marginLeft: 'auto' }}>{formatDate(otherJob.createdAt.toISOString())}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Link href="/careers" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', color: '#1F4E8C', fontWeight: 600, fontSize: '0.9rem' }}>
                                View All Jobs &rarr;
                            </Link>
                        </div>

                        {/* Additional Sidebar Card */}
                        <div style={{ backgroundColor: '#1F4E8C', borderRadius: '20px', padding: '2rem', color: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                            <h4 style={{ marginBottom: '1rem', fontWeight: 700 }}>Quick Tip</h4>
                            <p style={{ fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.6 }}>
                                Ensure your resume is in PDF format and matches the job highlights for a better match score!
                            </p>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
