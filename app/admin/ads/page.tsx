'use client';

import { useState, useEffect } from 'react';

type Ad = {
    id: string;
    title: string;
    destinationUrl: string;
    imageUrl: string;
    isActive: boolean;
    createdAt: string;
};

export default function AdsManagement() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);

    // Form state
    const [title, setTitle] = useState('');
    const [destinationUrl, setDestinationUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/ads');
                const data = await res.json();
                setAds(data || []);
            } catch (error) {
                console.error("Failed to load ads", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    const toggleAdStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/ads', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isActive: !currentStatus })
            });
            if (res.ok) {
                setAds(prev => prev.map(ad =>
                    ad.id === id ? { ...ad, isActive: !currentStatus } : ad
                ));
            }
        } catch (error) {
            console.error("Failed to toggle ad status", error);
        }
    };

    const handleCreateAd = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/ads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, destinationUrl, imageUrl })
            });
            if (res.ok) {
                const { ad } = await res.json();
                setAds(prev => [...prev, ad]);
                // Reset form
                setTitle('');
                setDestinationUrl('');
                setImageUrl('');
            }
        } catch (error) {
            console.error("Failed to create ad", error);
            alert("Failed to create ad.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Ads Manager</h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Create and manage promotional banner ads displayed across the site.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                {/* Create Ad Form */}
                <div className="glass" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: 'fit-content' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Create New Ad</h2>
                    <form onSubmit={handleCreateAd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ad Title / Internal Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. Summer Hiring Promo"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Destination URL (Link)</label>
                            <input
                                type="url"
                                value={destinationUrl}
                                onChange={e => setDestinationUrl(e.target.value)}
                                placeholder="https://example.com/promo"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>Banner Image URL</label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.png"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', outline: 'none' }}
                                required
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-sharp" style={{ marginTop: '1rem' }}>
                            {isSubmitting ? 'Creating...' : 'Publish Ad'}
                        </button>
                    </form>
                </div>

                {/* Ads List */}
                <div className="glass" style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    {loading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading ads...</div>
                    ) : ads.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            <p>No ads configured yet.</p>
                        </div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                                    <tr>
                                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Preview</th>
                                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Ad Details</th>
                                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>Performance</th>
                                        <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--color-text-muted)', textAlign: 'right' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ads.map((ad) => (
                                        <tr key={ad.id} style={{ borderBottom: '1px solid #E2E8F0', transition: 'background-color 0.2s' }}>
                                            <td style={{ padding: '1.25rem 1.5rem', width: '120px' }}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={ad.imageUrl}
                                                    alt={ad.title}
                                                    style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E2E8F0', opacity: ad.isActive ? 1 : 0.5 }}
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                                />
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <div style={{ fontWeight: 600, fontSize: '1rem', color: ad.isActive ? 'inherit' : 'var(--color-text-muted)' }}>{ad.title}</div>
                                                <a href={ad.destinationUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', textDecoration: 'none' }}>
                                                    {ad.destinationUrl.substring(0, 30)}...
                                                </a>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)' }}>
                                                <span style={{ fontSize: '0.85rem', padding: '0.2rem 0.5rem', backgroundColor: '#F1F5F9', borderRadius: '4px' }}>0 clicks</span>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => toggleAdStatus(ad.id, ad.isActive)}
                                                    className={`btn ${ad.isActive ? 'btn-outline' : 'btn-secondary'}`}
                                                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', minWidth: '90px' }}
                                                >
                                                    {ad.isActive ? 'Pause' : 'Activate'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
