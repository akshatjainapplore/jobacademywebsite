'use client';

import Image from 'next/image';

export default function LogoMarquee() {
    const logos = [
        { name: 'Nirmals Furnishings', src: '/logos/nirmals.png' },
        { name: 'Asian Business School', src: '/logos/abs.png' },
        { name: 'Love In Store', src: '/logos/love-in-store.png' },
        { name: 'Lavina', src: '/logos/lavina.png' },
        { name: 'Epicure Foods', src: '/logos/epicurefoods.png' },
        { name: 'Kairali Ayurvedic', src: '/logos/kairaliayurvedic.png' },
        { name: 'Brink Ads', src: '/logos/brinkadsblack.png' },
    ];

    // Multiply the logos for seamless looping across ultra-wide screens
    const doubledLogos = [...logos, ...logos, ...logos, ...logos];

    return (
        <section style={{
            backgroundColor: '#F9FAFB',
            padding: '4rem 0',
            borderBottom: '1px solid #F1F5F9',
            overflow: 'hidden'
        }}>
            <div className="container marquee-mask" style={{ position: 'relative' }}>
                <div className="animate-marquee" style={{ gap: '120px', paddingRight: '120px' }}>
                    {doubledLogos.map((logo, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 1rem',
                                position: 'relative',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'pointer',
                                flexShrink: 0,
                                mixBlendMode: 'multiply'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <img
                                src={`${logo.src}?v=4`}
                                alt={logo.name}
                                style={{
                                    height: '160px',
                                    width: 'auto',
                                    maxWidth: '350px',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
