export function ProcessSection() {
    return (
        <section className="section-break bg-cool" style={{ backgroundColor: 'rgba(0, 82, 255, 0.03)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>How Job Academy Works</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>A streamlined 3-step path to your next landmark role.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                    {[
                        { id: '1', title: 'Consultation', text: 'We understand your unique strengths and career goals.' },
                        { id: '2', title: 'Selection', text: 'Curated matching with legacy firms in our network.' },
                        { id: '3', title: 'Growth', text: 'Seamless onboarding and long-term career support.' }
                    ].map(step => (
                        <div key={step.id} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                margin: '0 auto 2rem auto',
                                boxShadow: '0 10px 20px rgba(0, 82, 255, 0.3)'
                            }}>
                                {step.id}
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>{step.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
