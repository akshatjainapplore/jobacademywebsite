'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function EmployerSidebar() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'Dashboard', href: '/employer' },
    { name: 'Post a Job', href: '/employer/post-job' },
    { name: 'ATS Pipeline', href: '/employer/ats' },
    { name: 'Talent Pool', href: '/employer/talent' },
    { name: 'Company Profile', href: '/employer/profile' },
  ];

  return (
    <aside className="glass" style={{ width: '280px', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--color-border-glass)' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Employer Portal
      </h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="btn btn-sharp" style={{ 
            justifyContent: 'flex-start',
            backgroundColor: pathname === link.href ? 'var(--color-primary-soft)' : 'transparent',
            color: pathname === link.href ? 'var(--color-primary)' : 'var(--color-text-muted)',
            boxShadow: 'none',
            border: 'none',
          }}>
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
