import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      <aside style={{ width: '260px', padding: '2rem 1rem', background: 'rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 700, color: '#ef4444' }}>Admin Control Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/admin" style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', textDecoration: 'none', fontWeight: 600 }}>System Overview</Link>
          <Link href="/admin/users" style={{ padding: '0.75rem', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Manage Users</Link>
          <Link href="/admin/jobs" style={{ padding: '0.75rem', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Active Jobs</Link>
          <Link href="/admin/security" style={{ padding: '0.75rem', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none' }}>Security Audit Log</Link>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
