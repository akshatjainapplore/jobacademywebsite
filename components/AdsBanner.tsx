'use client';

import { useState, useEffect } from 'react';

type Ad = {
    id: string;
    title: string;
    destinationUrl: string;
    imageUrl: string;
    isActive: boolean;
};

export default function AdsBanner() {
    const [activeAd, setActiveAd] = useState<Ad | null>(null);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await fetch('/api/ads');
                const ads: Ad[] = await res.json();
                const activeAds = ads.filter(ad => ad.isActive);
                if (activeAds.length > 0) {
                    // Just show the first active ad for simplicity (could be randomized)
                    setActiveAd(activeAds[0]);
                }
            } catch (error) {
                console.error('Failed to load ad banner', error);
            }
        };
        fetchAds();
    }, []);

    if (!activeAd) return null;

    return (
        <a
            href={activeAd.destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'block',
                width: '100%',
                marginBottom: '2rem',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                textDecoration: 'none'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={activeAd.imageUrl}
                alt={activeAd.title}
                style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }}
            />
        </a>
    );
}
