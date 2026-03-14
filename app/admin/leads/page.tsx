'use client';

import { useState, useEffect } from 'react';

type Lead = {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    requirements: string;
    submittedAt: string;
    status: string;
};

export default function LeadsManagement() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/leads');
                const data = await res.json();
                setLeads(data || []);
            } catch (error) {
                console.error("Failed to load leads", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, []);

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Employer Leads</h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Manage incoming corporate inquiries for talent sourcing.</p>
            </div>

            <div className="glass" style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading employer leads...</div>
                ) : leads.length === 0 ? (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <p>No employer leads received yet.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Company / Contact</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Contact Info</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Requirements</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Submitted</th>
                                    <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)', textAlign: 'right' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{lead.companyName}</div>
                                            <div style={{ color: 'var(--color-text-muted)' }}>{lead.contactName}</div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                            <div>{lead.email}</div>
                                            <div>{lead.phone}</div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                                            <div style={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }} title={lead.requirements}>
                                                {lead.requirements}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                            {new Date(lead.submittedAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                backgroundColor: lead.status === 'New' ? '#FEF3C7' : '#E0E7FF',
                                                color: lead.status === 'New' ? '#D97706' : '#4F46E5'
                                            }}>
                                                {lead.status || 'New'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
