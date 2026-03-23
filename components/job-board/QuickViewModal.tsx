import Link from 'next/link';

export function QuickViewModal({ job, isOpen, onClose }: { job: any, isOpen: boolean, onClose: () => void }) {
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
