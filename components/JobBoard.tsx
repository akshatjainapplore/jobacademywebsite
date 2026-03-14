'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AdsBanner from '@/components/AdsBanner';

// --- Sub-components ---

function QuickViewModal({ job, isOpen, onClose }: { job: any, isOpen: boolean, onClose: () => void }) {
    if (!job) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2000,
            display: isOpen ? 'block' : 'none',
            pointerEvents: isOpen ? 'auto' : 'none'
        }}>
            {/* Backdrop click to close */}
            <div onClick={onClose} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.1)'
            }} />

            {/* Glassmorphic Pane */}
            <div className="glass" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                maxWidth: '600px',
                height: '100%',
                backgroundColor: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.1)',
                padding: '4rem 3rem',
                transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                borderLeft: '1.5px solid rgba(255,255,255,0.4)',
                overflowY: 'auto'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: 'var(--color-text)'
                }}>✕</button>

                <div>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: 'var(--color-primary)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>Quick View</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{job.title}</h2>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <span style={{ backgroundColor: '#F1F5F9', color: '#475569', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{job.location}</span>
                        <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>{job.type}</span>
                    </div>
                    {job.salary && (
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'black', marginBottom: '1rem' }}>
                            ₹{job.salary} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>p.a.</span>
                        </div>
                    )}
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Description</h3>
                    <p style={{ lineHeight: 1.8, color: 'var(--color-text-muted)' }}>{job.description}</p>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', paddingTop: '2rem' }}>
                    <Link href={`/careers/${job.id}`} className="btn btn-primary btn-sharp" style={{ flex: 1 }}>Full Details</Link>
                    <Link href={`/careers/${job.id}`} className="btn btn-sharp" style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'transparent', flex: 1, textAlign: 'center', textDecoration: 'none' }}>Apply Now</Link>
                </div>
            </div>
        </div>
    );
}

function JobCard({ job, onQuickView }: { job: any, onQuickView: (job: any) => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                minHeight: '260px',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                boxShadow: isHovered
                    ? '0 20px 40px rgba(0, 0, 0, 0.08)'
                    : '0 10px 30px rgba(0, 0, 0, 0.05)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                border: isHovered ? '1.5px solid var(--color-primary)' : '1.5px solid transparent'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#EEF2FF', color: '#4F46E5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E0E7FF' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {new Date(job.postedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </div>
            </div>

            <div onClick={() => window.location.href = `/careers/${job.id}`}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Job Academy Client
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2, color: 'black', marginBottom: '1rem' }}>{job.title}</h3>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: '#F1F5F9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{job.location}</span>
                    <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{job.type}</span>
                </div>

                {job.salary && (
                    <div style={{ marginTop: '0.75rem', fontSize: '1.1rem', fontWeight: 700, color: 'black' }}>
                        ₹{job.salary} <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>p.a.</span>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={(e) => { e.stopPropagation(); onQuickView(job); }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        padding: 0
                    }}>
                    Quick View
                </button>
                <Link href={`/careers/${job.id}`} style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800 }}>
                    →
                </Link>
            </div>
        </div>
    );
}

// --- Main component ---

function JobBoardContent({ initialJobs }: { initialJobs: any[] }) {
    const searchParams = useSearchParams();
    const [jobs] = useState(initialJobs);
    const [filteredJobs, setFilteredJobs] = useState(initialJobs);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [filters, setFilters] = useState({
        fullTime: true,
        partTime: true,
        contract: true,
        internship: true
    });

    useEffect(() => {
        const q = searchParams.get('q');
        const loc = searchParams.get('location');
        if (q) setSearchQuery(q);
        if (loc) setLocationQuery(loc);
    }, [searchParams]);

    useEffect(() => {
        let result = jobs;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((job: any) =>
                job.title.toLowerCase().includes(query) ||
                job.description?.toLowerCase().includes(query)
            );
        }
        if (locationQuery) {
            const query = locationQuery.toLowerCase();
            result = result.filter((job: any) =>
                job.location.toLowerCase().includes(query)
            );
        }

        // Mock filter logic based on 'type'
        if (!filters.fullTime) result = result.filter((job: any) => job.type !== 'Full-time');
        if (!filters.partTime) result = result.filter((job: any) => job.type !== 'Part-time');
        if (!filters.contract) result = result.filter((job: any) => job.type !== 'Contract');
        if (!filters.internship) result = result.filter((job: any) => job.type !== 'Internship');

        setFilteredJobs(result);
    }, [jobs, searchQuery, locationQuery, filters]);

    const handleQuickView = (job: any) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    return (
        <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', padding: '4rem 0' }}>

            <div className="container">
                {/* Minimalist Search Header */}
                <header style={{ marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '3rem', letterSpacing: '-0.02em' }}>
                        Career Opportunities
                    </h1>
                    <div style={{
                        display: 'flex',
                        border: '1.5px solid #F1F5F9',
                        borderRadius: '8px',
                        padding: '8px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        alignItems: 'center'
                    }}>
                        <div style={{ flex: 1, padding: '0 1.5rem', position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search by role or keyword"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '1.25rem 0', outline: 'none', fontSize: '1.1rem', fontWeight: 500 }}
                            />
                        </div>
                        <div style={{ width: '1.5px', height: '30px', backgroundColor: '#F1F5F9' }}></div>
                        <div style={{ flex: 1, padding: '0 1.5rem' }}>
                            <input
                                type="text"
                                placeholder="Location"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                style={{ width: '100%', border: 'none', padding: '1.25rem 0', outline: 'none', fontSize: '1.1rem', fontWeight: 500 }}
                            />
                        </div>
                        <button className="btn btn-primary btn-sharp" style={{ padding: '1.25rem 3rem', fontSize: '1rem', fontWeight: 800 }}>
                            Search Jobs
                        </button>
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem' }}>
                    {/* Minimalist Sidebar */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                        <AdsBanner />

                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'black', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Employment
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {[
                                    { id: 'fullTime', label: 'Full-time' },
                                    { id: 'partTime', label: 'Part-time' },
                                    { id: 'contract', label: 'Contract' },
                                    { id: 'internship', label: 'Internship' }
                                ].map((type) => (
                                    <div
                                        key={type.id}
                                        onClick={() => setFilters(prev => ({ ...prev, [type.id]: !prev[type.id as keyof typeof filters] }))}
                                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', fontSize: '1rem' }}
                                    >
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: filters[type.id as keyof typeof filters] ? 'var(--color-primary)' : 'transparent',
                                            border: filters[type.id as keyof typeof filters] ? 'none' : '1.5px solid #d1d5db',
                                            transition: 'all 0.2s'
                                        }} />
                                        <span style={{
                                            fontWeight: 600,
                                            color: filters[type.id as keyof typeof filters] ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                            transition: 'color 0.2s'
                                        }}>
                                            {type.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ height: '1px', backgroundColor: '#F1F5F9' }}></div>

                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'black', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Location
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {['New York', 'London', 'San Francisco', 'Remote'].map(loc => (
                                    <div
                                        key={loc}
                                        onClick={() => setLocationQuery(locationQuery.toLowerCase() === loc.toLowerCase() ? '' : loc)}
                                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', fontSize: '1rem', color: locationQuery.toLowerCase() === loc.toLowerCase() ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600 }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            border: locationQuery.toLowerCase() === loc.toLowerCase() ? 'none' : '1.5px solid #d1d5db',
                                            backgroundColor: locationQuery.toLowerCase() === loc.toLowerCase() ? 'var(--color-primary)' : 'transparent',
                                            transition: 'all 0.2s'
                                        }} />
                                        <span>{loc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {filteredJobs.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
                                No positions currently match your filters.
                            </div>
                        ) : (
                            filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} onQuickView={handleQuickView} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <QuickViewModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}

export default function JobBoard({ initialJobs }: { initialJobs: any[] }) {
    return (
        <Suspense fallback={<div>Loading jobs...</div>}>
            <JobBoardContent initialJobs={initialJobs} />
        </Suspense>
    );
}
