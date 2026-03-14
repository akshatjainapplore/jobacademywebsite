'use client';

import { useState } from 'react';

export default function ApplicationForm({ jobId }: { jobId: string }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: ''
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // File Validation
        if (!resumeFile) {
            alert("Please upload a resume.");
            setStatus('idle');
            return;
        }
        if (resumeFile.type !== 'application/pdf') {
            alert("Only PDF files are allowed.");
            setStatus('idle');
            return;
        }
        if (resumeFile.size > 5 * 1024 * 1024) { // 5MB
            alert("File size must be less than 5MB.");
            setStatus('idle');
            return;
        }

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phone', formData.phone);
        formDataToSubmit.append('experience', formData.experience);
        formDataToSubmit.append('jobId', jobId);
        formDataToSubmit.append('resume', resumeFile);

        try {
            const res = await fetch('/api/applications', {
                method: 'POST',
                body: formDataToSubmit,
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', experience: '' });
                setResumeFile(null);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    if (status === 'success') {
        return (
            <div style={{ padding: '2rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', color: '#166534', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Application Submitted!</h3>
                <p>Thank you for applying. We will review your profile and get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="btn btn-primary" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Submit Another</button>
            </div>
        );
    }

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        marginBottom: '1.5rem',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        outline: 'none'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 700,
        fontSize: '0.9rem',
        color: 'var(--color-text)',
        letterSpacing: '0.01em'
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'transparent', padding: '0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="+91 XXXXX XXXXX"
                    />
                </div>

                <div>
                    <label style={labelStyle}>Years of Experience</label>
                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="e.g. 5+ Years"
                    />
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label style={labelStyle}>Resume (PDF only, Max 5MB) *</label>
                <input
                    type="file"
                    name="resume"
                    required
                    accept="application/pdf"
                    onChange={handleFileChange}
                    style={{ ...inputStyle, padding: '0.75rem', backgroundColor: 'white' }}
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="btn btn-primary btn-sharp"
                    disabled={status === 'submitting'}
                    style={{ width: '100%', padding: '1.25rem' }}
                >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Final Application'}
                </button>
            </div>
        </form>
    );
}
