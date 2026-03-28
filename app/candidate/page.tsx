import React from 'react';

export default function CandidateDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Dashboard Insights</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Total Applications</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>5</p>
        </div>
        <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Interviews</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>1</p>
        </div>
        <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Saved Jobs</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>12</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Application Status</h2>
      <div className="glass glass-sharp" style={{ padding: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
           <thead>
             <tr style={{ borderBottom: '1px solid var(--color-border-glass)' }}>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Company</th>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Role</th>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status</th>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Applied On</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                   <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--color-primary)' }}></div>
                   <span style={{ fontWeight: 600 }}>Tech Innovators Inc.</span>
                 </div>
               </td>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}>Senior Frontend Engineer</td>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}><span style={{ padding: '0.35rem 0.85rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>In Review</span></td>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}>Otc 24, 2026</td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>
  );
}
