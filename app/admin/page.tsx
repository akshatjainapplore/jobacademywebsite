'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        jobs: 0,
        applications: 0,
        leads: 0,
        ads: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllStats() {
            setLoading(true);
            try {
                const [jobsRes, appsRes, leadsRes, adsRes] = await Promise.all([
                    fetch('/api/jobs'),
                    fetch('/api/applications'),
                    fetch('/api/leads'),
                    fetch('/api/ads')
                ]);
                const jobs = await jobsRes.json();
                const apps = await appsRes.json();
                const leads = await leadsRes.json();
                const ads = await adsRes.json();

                setStats({
                    jobs: Array.isArray(jobs) ? jobs.length : 0,
                    applications: Array.isArray(apps) ? apps.length : 0,
                    leads: Array.isArray(leads) ? leads.length : 0,
                    ads: Array.isArray(ads) ? ads.length : 0
                });
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllStats();
    }, []);

    const metricCards = [
        { label: 'Total Jobs', count: stats.jobs, link: '/admin/jobs', color: '#E0E7FF', text: '#4F46E5' },
        { label: 'Total Applicants', count: stats.applications, link: '/admin/applicants', color: '#FEF3C7', text: '#D97706' },
        { label: 'Employer Leads', count: stats.leads, link: '/admin/leads', color: '#D1FAE5', text: '#059669' },
        { label: 'Active Ads', count: stats.ads, link: '/admin/ads', color: '#FCE7F3', text: '#DB2777' },
    ];

    if (loading) {
        return <div>Loading Dashboard Metrics...</div>;
    }

    return (
        <div>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Welcome to the Job Academy Admin Portal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {metricCards.map(card => (
                    <div key={card.label} className="glass" style={{
                        padding: '2rem',
                        borderRadius: '16px',
                        backgroundColor: 'white',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, color: 'var(--color-text-muted)' }}>{card.label}</div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                backgroundColor: card.color,
                                color: card.text,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800
                            }}>
                                {/* Arrow svg icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-text)' }}>
                            {card.count}
                        </div>
                        <Link href={card.link} className="btn btn-outline btn-sharp" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9rem' }}>
                            Manage &rarr;
                        </Link>
                    </div>
                ))}
            </div>

            {/* Quick Actions / Getting Started */}
            <div className="glass" style={{ padding: '3rem', borderRadius: '24px', backgroundColor: 'white' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/admin/new" className="btn btn-primary btn-sharp">Create New Job Posting</Link>
                    <Link href="/admin/ads" className="btn btn-outline btn-sharp">Upload New Banner Ad</Link>
                </div>
            </div>
        </div>
    );
}
