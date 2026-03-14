export default function Footer() {
    return (
        <footer className="bg-cool" style={{ padding: 'var(--section-padding) 0', borderTop: '1px solid #e2e8f0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Join our talent ecosystem</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                            Stay updated on high-impact roles and career insights.
                        </p>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{
                                padding: '1rem 1.5rem',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                        />
                        <button className="btn btn-primary btn-sharp" style={{ width: 'fit-content' }}>
                            Submit Interest
                        </button>
                    </form>
                </div>

                <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '2rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <div>&copy; {new Date().getFullYear()} Job Academy. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <span>B1/17. Yamuna Vihar, Delhi, 110053</span>
                        <span>+91 9650329057</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
