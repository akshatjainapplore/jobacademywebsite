'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Job = {
    id: string;
    title: string;
    location: string;
    type: string;
    status: string;
    postedAt: string;
};

export default function JobsManagement() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/jobs');
                const data = await res.json();
                setJobs(data || []);
            } catch (error) {
                console.error("Failed to load jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Jobs Management</h1>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Create, edit, and manage active job postings.</p>
                </div>
                <Link href="/admin/new" className="btn btn-primary btn-sharp">
                    + Create New Job
                </Link>
            </div>

            <div className="glass" style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading jobs...</div>
                ) : jobs.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <p>No jobs found.</p>
                        <Link href="/admin/new" className="btn btn-primary" style={{ marginTop: '1rem' }}>Create your first job</Link>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Job Title</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Location</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Type</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Status</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Posted On</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600 }}>{job.title}</td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>{job.location}</td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>{job.type}</td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                backgroundColor: job.status === 'active' ? '#D1FAE5' : '#FEE2E2',
                                                color: job.status === 'active' ? '#065F46' : '#991B1B'
                                            }}>
                                                {job.status === 'active' ? 'Active' : 'Archived'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                            {new Date(job.postedAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <Link href={`/admin/edit/${job.id}`} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                                Edit Job
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
