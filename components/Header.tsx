import Link from 'next/link';

export default function Header() {
    return (
        <header className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1.25rem 0',
            borderBottom: 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'var(--color-primary)',
                    textDecoration: 'none',
                    letterSpacing: '-0.04em'
                }}>
                    JOB ACADEMY
                </Link>

                <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <Link href="/" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>Home</Link>
                    <Link href="/process" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>Our Process</Link>
                    <Link href="/careers" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>Careers</Link>
                    <div style={{ width: '1px', height: '24px', background: 'var(--color-border-glass)' }}></div>
                    <Link href="/login" className="btn btn-sharp btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Employer Login</Link>
                    <Link href="/login" className="btn btn-sharp btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>Candidate Login</Link>                </nav>
            </div>
        </header>
    );
}
