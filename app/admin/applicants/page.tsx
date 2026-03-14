'use client';

import { useState, useEffect } from 'react';

type Application = {
    id: string;
    jobId: string;
    name: string;
    email: string;
    phone: string;
    experience: string;
    resume: string;
    submittedAt: string;
    status: string;
};

type Job = {
    id: string;
    title: string;
};

export default function ApplicantsManagement() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [jobs, setJobs] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [appsRes, jobsRes] = await Promise.all([
                    fetch('/api/applications'),
                    fetch('/api/jobs')
                ]);

                const appsData = await appsRes.json();
                const jobsData = await jobsRes.json();

                // Create lookup dictionary for job titles
                const jobsDict: Record<string, string> = {};
                jobsData.forEach((j: Job) => {
                    jobsDict[j.id] = j.title;
                });

                setJobs(jobsDict);
                setApplications(appsData || []);
            } catch (error) {
                console.error("Failed to load applicants", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                // Optimistic UI update
                setApplications(prev => prev.map(app =>
                    app.id === id ? { ...app, status: newStatus } : app
                ));
            }
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status. Please try again.");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return { bg: '#FEF3C7', text: '#D97706' }; // Amber
            case 'Reviewed': return { bg: '#E0E7FF', text: '#4F46E5' }; // Indigo
            case 'Interviewing': return { bg: '#DBEAFE', text: '#2563EB' }; // Blue
            case 'Hired': return { bg: '#D1FAE5', text: '#059669' }; // Emerald
            case 'Rejected': return { bg: '#FEE2E2', text: '#DC2626' }; // Red
            default: return { bg: '#F1F5F9', text: '#64748B' }; // Slate
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Applicant Review</h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Review resumes and manage candidate pipelines.</p>
            </div>

            <div className="glass" style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading applicants...</div>
                ) : applications.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <p>No applications received yet.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Candidate</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Applied For</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Experience</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Submitted</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Resume</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)', textAlign: 'right' }}>Pipeline Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ fontWeight: 600 }}>{app.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                                {app.email} <br /> {app.phone}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                                                {jobs[app.jobId] || `Job #${app.jobId}`}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>{app.experience} yrs</td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                            {new Date(app.submittedAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <a href={app.resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                                View PDF
                                            </a>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <select
                                                value={app.status || 'Pending'}
                                                onChange={(e) => updateStatus(app.id, e.target.value)}
                                                style={{
                                                    padding: '0.5rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid #E2E8F0',
                                                    backgroundColor: getStatusColor(app.status || 'Pending').bg,
                                                    color: getStatusColor(app.status || 'Pending').text,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Reviewed">Reviewed</option>
                                                <option value="Interviewing">Interviewing</option>
                                                <option value="Hired">Hired</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
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
