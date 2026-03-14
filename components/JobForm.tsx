'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function JobForm({ initialData, isEdit = false }: { initialData?: any, isEdit?: boolean }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        type: 'Full-time',
        status: 'active',
        description: ''
    });
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const url = isEdit ? `/api/jobs/${initialData.id}` : '/api/jobs';
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '6px',
        border: '1px solid var(--color-border)',
        marginBottom: '1rem',
        fontFamily: 'inherit',
        fontSize: '1rem'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 600,
        color: 'var(--color-primary)'
    };

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div>
                <label style={labelStyle}>Job Title</label>
                <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="e.g. Senior Product Manager"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                    <label style={labelStyle}>Location</label>
                    <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="e.g. New York, NY"
                    />
                </div>
                <div>
                    <label style={labelStyle}>Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Freelance</option>
                    </select>
                </div>
            </div>

            {isEdit && (
                <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            )}

            <div>
                <label style={labelStyle}>Description</label>
                <textarea
                    name="description"
                    required
                    rows={10}
                    value={formData.description}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Enter detailed job description..."
                />
            </div>

            {status === 'error' && (
                <p style={{ color: 'red', marginBottom: '1rem' }}>Failed to save job.</p>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === 'submitting'}
                    style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                >
                    {status === 'submitting' ? 'Saving...' : (isEdit ? 'Update Job' : 'Create Job')}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
