'use client';
import React, { useState } from 'react';

export default function CandidateProfilePage() {
  const [formData, setFormData] = useState({ firstName: 'Jane', lastName: 'Doe', bio: 'A passionate developer.', skills: 'React, Node' });

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = new FormData();
      data.append('file', file);
      // Mock upload call
      fetch('/api/upload', { method: 'POST', body: data }).then(res => res.json()).then(data => alert('CV Uploaded at: ' + data.url));
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Profile</h1>
      
      <div className="glass glass-sharp" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRadius: '16px' }}>
        
        {/* CV Upload Section */}
        <div style={{ padding: '2rem', border: '2px dashed var(--color-border-glass)', borderRadius: '12px', textAlign: 'center', background: 'rgba(0,82,255,0.05)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Upload Latest CV/Resume</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>PDF or Word Doc up to 5MB</p>
          <input type="file" id="cv-upload" style={{ display: 'none' }} accept=".pdf,.doc,.docx" onChange={handleCVUpload} />
          <label htmlFor="cv-upload" className="btn btn-sharp btn-primary" style={{ cursor: 'pointer', padding: '0.75rem 2rem' }}>Browse Files</label>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>First Name</label>
              <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Last Name</label>
              <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }} required />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Professional Bio</label>
            <textarea rows={4} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }}></textarea>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Skills (Comma Separated)</label>
            <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border-glass)', background: 'rgba(255,255,255,0.4)', outline: 'none' }} />
          </div>

          <button type="button" className="btn btn-sharp btn-gradient" style={{ alignSelf: 'flex-start', padding: '1rem 3rem' }}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}
