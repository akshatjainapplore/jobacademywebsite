import { useState } from 'react';

export function AdminLogin({ onLogin }: { onLogin: (u: string, p: string) => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg-secondary)' }}>
            <div className="glass" style={{
                padding: '4rem',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'white',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Job Academy</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Admin Portal Login</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Username</label>
                        <input
                            type="text"
                            placeholder="Enter admin"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter admin123"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none', fontSize: '1rem' }}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sharp" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                        Secure Login &rarr;
                    </button>
                </form>
            </div>
        </div>
    );
}
