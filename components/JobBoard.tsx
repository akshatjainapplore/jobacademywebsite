'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AdsBanner from '@/components/AdsBanner';

// --- Imported Sub-components ---
import { QuickViewModal } from './job-board/QuickViewModal';
import { JobCard } from './job-board/JobCard';

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
