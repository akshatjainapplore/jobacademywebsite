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


                </nav>
            </div>
        </header>
    );
}
