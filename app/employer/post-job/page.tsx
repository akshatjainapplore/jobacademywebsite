'use client';
import React from 'react';

export default function PostJobPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Job functionality will be wired up via Server Actions shortly.');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Post a New Job</h1>
      <form onSubmit={handleSubmit} className="glass glass-sharp" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Title</label>
          <input type="text" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} placeholder="e.g. Senior Product Designer" required />
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Type</label>
            <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }}>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem' }}>
            <input type="checkbox" id="remote" style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }} />
            <label htmlFor="remote" style={{ fontWeight: 600, cursor: 'pointer' }}>Is Remote Role?</label>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Salary Range (USD)</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input type="number" placeholder="Min" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} />
            <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>—</span>
            <input type="number" placeholder="Max" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', color: 'var(--color-text)', fontSize: '1rem', outline: 'none' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Job Description</label>
          <textarea rows={6} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', color: 'var(--color-text)', fontSize: '1rem', resize: 'vertical', outline: 'none' }} placeholder="Describe the responsibilities and requirements..."></textarea>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-glass)', margin: '1rem 0' }} />
        <button type="submit" className="btn btn-sharp btn-gradient" style={{ alignSelf: 'flex-end', padding: '1rem 3rem', fontSize: '1.125rem' }}>
          Publish Job Posting
        </button>
      </form>
    </div>
  );
}
