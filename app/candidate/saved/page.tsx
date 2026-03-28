import React from 'react';

export default function SavedJobsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Saved Jobs & Recommendations</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div className="glass glass-sharp" style={{ padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--color-text)' }}></div>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>UX/UI Product Designer</h2>
                <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Creative Studios GmbH • Berlin (Hybrid)</p>
              </div>
            </div>
            <button className="btn btn-sharp btn-outline" style={{ padding: '0.5rem 1rem' }}>Remove</button>
          </div>
          <p style={{ color: 'var(--color-text-muted)' }}>Join our award-winning design agency in Berlin. Looking for someone with 3+ years of experience in Figma, design systems, and framer.</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ background: 'var(--color-bg-secondary)', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>€70k - €90k</span>
            <span style={{ background: 'var(--color-bg-secondary)', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Full Time</span>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 700, marginLeft: '1rem' }}>✨ 98% Match</span>
            <div style={{ flex: 1 }}></div>
            <button className="btn btn-sharp btn-gradient" style={{ padding: '0.5rem 2rem' }}>1-Click Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
