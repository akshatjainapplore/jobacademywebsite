import Image from 'next/image';

export function HeroSection() {
    return (
        <section className="section-break" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div className="reveal active">
                        <h1 style={{ marginBottom: '2rem' }}>
                            Find your job, <br />
                            <span style={{ color: 'var(--color-primary)' }}>build your career.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
                            Job Academy connects high-impact talent with world-class opportunities through a 25-year legacy of recruitment excellence.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a href="/careers" className="btn btn-primary btn-pill">Explore Roles</a>
                            <a href="/process" className="btn btn-outline btn-pill">Our Process</a>
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '600px',
                            borderRadius: '32px',
                            overflow: 'hidden',
                            boxShadow: '0 40px 80px rgba(0, 82, 255, 0.1)'
                        }}>
                            <Image
                                src="/office-team.png"
                                alt="Success at Job Academy"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Floating Glass Widgets */}
                        <div className="glass" style={{
                            position: 'absolute',
                            top: '10%',
                            right: '-5%',
                            padding: '1.5rem 2rem',
                            borderRadius: '20px',
                            maxWidth: '200px'
                        }}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>10k+</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Placements Completed</div>
                        </div>

                        <div className="glass" style={{
                            position: 'absolute',
                            bottom: '15%',
                            left: '-10%',
                            padding: '1.5rem 2rem',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>✓</div>
                            <div>
                                <div style={{ fontWeight: 800 }}>98%</div>
                                <div style={{ fontSize: '0.8rem' }}>Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
