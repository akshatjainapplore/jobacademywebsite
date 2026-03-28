import React from 'react';

export default function TalentPoolPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Talent Pool</h1>
      <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" placeholder="Search saved candidates by skills or name..." style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }} />
          <button className="btn btn-sharp btn-primary" style={{ padding: '0 2rem' }}>Search</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* Mock Candidate Cards */}
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--gradient-primary)' }}></div>
              <div>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Michael Chen</h3>
                 <p style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Full Stack Developer</p>
              </div>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Next.js, React, Node.js, Prisma, SQL.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-sharp btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>View Profile</button>
              <button className="btn btn-sharp btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
