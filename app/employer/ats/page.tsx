'use client';
import React, { useState } from 'react';

// Mock Kanban Data
const initialStages = [
  { id: 'APPLIED', title: 'Applied', applicants: [{ id: 1, name: 'Alice Walker', role: 'UX Designer' }, { id: 2, name: 'Bob Singer', role: 'Data Scientist' }] },
  { id: 'SCREENED', title: 'Screened', applicants: [{ id: 3, name: 'Charlie Day', role: 'Frontend Engineer' }] },
  { id: 'INTERVIEW', title: 'Interview', applicants: [{ id: 4, name: 'Diana Prince', role: 'Product Manager' }] },
  { id: 'OFFER', title: 'Offer', applicants: [] },
];

export default function ATSPipeline() {
  const [stages] = useState(initialStages);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>ATS Pipeline</h1>
        <select style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', outline: 'none', background: 'white' }}>
          <option>All Jobs</option>
          <option>Senior Frontend Engineer</option>
          <option>UX Designer</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', flex: 1 }}>
        {stages.map((stage) => (
          <div key={stage.id} style={{ minWidth: '300px', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass glass-sharp" style={{ padding: '1rem', borderRadius: '12px', borderTop: `4px solid var(--color-primary)` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{stage.title}</h3>
                <span style={{ background: 'var(--color-bg-secondary)', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600 }}>{stage.applicants.length}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              {stage.applicants.map((applicant) => (
                <div key={applicant.id} className="glass" style={{ padding: '1.25rem', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s', background: 'white' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{applicant.name}</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{applicant.role}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Applied 2d ago</span>
                    <button className="btn btn-sharp btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>View Profile</button>
                  </div>
                </div>
              ))}
              
              {stage.applicants.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', border: '2px dashed var(--color-border-glass)', borderRadius: '12px' }}>
                  Drop applicants here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
