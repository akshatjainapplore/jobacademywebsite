import { useState } from 'react';
import Link from 'next/link';

export function JobCard({ job, onQuickView }: { job: any, onQuickView: (job: any) => void }) {
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'black', fontWeight: 700, fontSize: '1.1rem' }}>
                        {job.salary}
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
