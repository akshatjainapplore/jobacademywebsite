import React from 'react';

export default function EmployerDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Dashboard Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Active Jobs</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>12</p>
        </div>
        <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Total Applications</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>148</p>
        </div>
        <div className="glass glass-sharp" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 600 }}>Interviews Scheduled</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>8</p>
        </div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Applications</h2>
      <div className="glass glass-sharp" style={{ padding: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
           <thead>
             <tr style={{ borderBottom: '1px solid var(--color-border-glass)' }}>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Candidate</th>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Role</th>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status</th>
               <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Action</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}>Jane Smith</td>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}>Senior Frontend Engineer</td>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}><span style={{ padding: '0.35rem 0.85rem', backgroundColor: 'var(--color-primary-soft)', color: 'var(--color-primary)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>Screening</span></td>
               <td style={{ padding: '1rem', borderBottom: '1px solid var(--color-border-glass)' }}><button className="btn btn-sharp btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Review CV</button></td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>
  );
}
