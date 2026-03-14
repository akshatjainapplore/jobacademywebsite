'use client';

import { useState } from 'react';

export default function EmployerLeadForm() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        requirements: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ companyName: '', contactName: '', email: '', phone: '', requirements: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="glass" style={{
                padding: '3rem',
                borderRadius: '24px',
                backgroundColor: 'white',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#D1FAE5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '1.5rem'
                }}>
                    ✓
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Request Received</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Our team will review your requirements and reach out shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-outline btn-sharp">Submit Another</button>
            </div>
        );
    }

    return (
        <div className="glass" style={{
            padding: '3rem',
            borderRadius: '24px',
            backgroundColor: 'white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
        }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Looking to Hire?</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Connect with our sourcing experts to find the perfect talent for your team.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none' }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="contactName"
                            placeholder="Your Name"
                            value={formData.contactName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none' }}
                            required
                        />
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Work Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none' }}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none' }}
                            required
                        />
                    </div>
                </div>
                <div>
                    <textarea
                        name="requirements"
                        placeholder="Briefly describe your hiring requirements (e.g., Senior React Developer, 5 years exp, Remote)"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows={4}
                        style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1.5px solid #E2E8F0', outline: 'none', resize: 'vertical' }}
                        required
                    />
                </div>

                {status === 'error' && (
                    <div style={{ color: '#DC2626', fontSize: '0.9rem', padding: '0.5rem', backgroundColor: '#FEE2E2', borderRadius: '4px' }}>
                        Something went wrong. Please try again.
                    </div>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-sharp" style={{ padding: '1rem', marginTop: '0.5rem' }}>
                    {status === 'submitting' ? 'Submitting...' : 'Submit Request \u2192'}
                </button>
            </form>
        </div>
    );
}
