import React from 'react';

export default function JobSearchPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Find Your Next Role</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Job title, keywords, or company..." style={{ flex: 2, padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.7)', fontSize: '1rem', outline: 'none' }} />
          <input type="text" placeholder="Location or Remote" style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.7)', fontSize: '1rem', outline: 'none' }} />
          <button className="btn btn-sharp btn-primary" style={{ padding: '0 2.5rem' }}>Search</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem', flex: 1 }}>
        {/* Filters Sidebar */}
        <div className="glass glass-sharp" style={{ padding: '1.5rem', borderRadius: '12px', height: 'max-content' }}>
          <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem', fontWeight: 700 }}>Filters</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Job Type</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Full Time</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Part Time</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Contract</label>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>Experience Level</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Entry Level</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Mid Level</label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}><input type="checkbox" /> Senior</label>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--gradient-primary)' }}></div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Senior Frontend Engineer</h2>
                  <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Tech Innovators Inc. • Remote</p>
                </div>
              </div>
              <button className="btn btn-sharp btn-outline" style={{ padding: '0.5rem 1rem' }}>Save</button>
            </div>
            <p style={{ color: 'var(--color-text-muted)' }}>We are looking for an experienced frontend engineer to lead our core product team. You will be working with React, Next.js, and TypeScript inside a fast-paced environment.</p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ background: 'var(--color-bg-secondary)', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>$120k - $160k</span>
              <span style={{ background: 'var(--color-bg-secondary)', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Full Time</span>
              <div style={{ flex: 1 }}></div>
              <button className="btn btn-sharp btn-primary" style={{ padding: '0.5rem 2rem' }}>1-Click Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
