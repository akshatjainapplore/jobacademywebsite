'use client';
import React, { useState } from 'react';

export default function CompanyProfilePage() {
  const [formData, setFormData] = useState({ companyName: 'Job Academy', website: 'https://jobacademy.com', description: 'Leading tech firm.' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Company profile updated.');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Company Profile</h1>
      <form onSubmit={handleSubmit} className="glass glass-sharp" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '12px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>JA</div>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Company Logo</h3>
            <button type="button" className="btn btn-sharp btn-outline" style={{ padding: '0.5rem 1rem' }}>Upload New Logo</button>
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Company Name</label>
          <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Website URL</label>
          <input type="url" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>About Company</label>
          <textarea rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }}></textarea>
        </div>
        
        <button type="submit" className="btn btn-sharp btn-primary" style={{ alignSelf: 'flex-start', padding: '1rem 2rem' }}>Save Changes</button>
      </form>
    </div>
  );
}
