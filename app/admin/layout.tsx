'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded auth for demo/local purposes
        if (username === 'admin' && password === 'admin123') {
            setIsLoggedIn(true);
            localStorage.setItem('admin_auth', 'true');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('admin_auth');
        router.push('/admin');
    };

    if (!isMounted) return null; // Prevent hydration mismatch

    if (!isLoggedIn) {
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

    const navItems = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Jobs', path: '/admin/jobs' },
        { name: 'Applicants', path: '/admin/applicants' },
        { name: 'Employer Leads', path: '/admin/leads' },
        { name: 'Ads Manager', path: '/admin/ads' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-secondary)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                backgroundColor: 'white',
                borderRight: '1.5px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 10
            }}>
                <div style={{ padding: '2rem', borderBottom: '1.5px solid #F1F5F9' }}>
                    <Link href="/admin" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)', textDecoration: 'none' }}>
                        Admin Center
                    </Link>
                </div>

                <nav style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    {navItems.map(item => {
                        const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
                        return (
                            <Link key={item.path} href={item.path} style={{
                                padding: '1rem 1.5rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: isActive ? 700 : 600,
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                backgroundColor: isActive ? 'var(--color-primary-soft)' : 'transparent',
                                transition: 'all 0.2s'
                            }}>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '2rem', borderTop: '1.5px solid #F1F5F9' }}>
                    <button onClick={handleLogout} className="btn btn-outline btn-sharp" style={{ width: '100%' }}>
                        Log Out
                    </button>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                        <Link href="/" target="_blank" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}>
                            View Live Site &nearr;
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, marginLeft: '280px', padding: '3rem', maxWidth: '1400px' }}>
                {children}
            </main>
        </div>
    );
}
