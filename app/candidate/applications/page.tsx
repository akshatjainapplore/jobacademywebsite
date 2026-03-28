import React from 'react';

export default function MyApplicationsPage() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Applications</h1>
      
      <div className="glass glass-sharp" style={{ padding: '1.5rem', borderRadius: '12px', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Senior Frontend Engineer</h3>
                <p style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Tech Innovators Inc.</p>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--gradient-primary)' }}></div>
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-glass)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Status</span>
                <span style={{ padding: '0.35rem 0.85rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>Screening</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>Applied on</span>
                <span style={{ fontWeight: 600 }}>Oct 24, 2026</span>
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px' }}>
              <button className="btn btn-sharp btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Withdraw</button>
              <button className="btn btn-sharp btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Message Team</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
