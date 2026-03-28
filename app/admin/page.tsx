import React from 'react';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>System Integrity</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>4,291</p>
          <span style={{ color: '#10b981', fontSize: '0.875rem' }}>+12% this week</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>System Health</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0', color: '#10b981' }}>Secure</p>
          <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>All services operational</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Detected Threats</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0', color: '#ef4444' }}>0</p>
          <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Last scan: 2 mins ago</span>
        </div>
      </div>
    </div>
  );
}
