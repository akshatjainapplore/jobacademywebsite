'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function SmartMatchDashboard() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    const features = [
        { title: 'AI-POWERED SOURCING', icon: '🤖', depth: 20 },
        { title: 'CULTURAL ALIGNMENT', icon: '🤝', depth: 40 },
        { title: 'TECHNICAL SCREENING', icon: '💻', depth: 30 },
        { title: 'NEGOTIATION SUPPORT', icon: '📈', depth: 50 },
    ];

    return (
        <section className="section-break" style={{ overflow: 'hidden' }}>
            <div className="container">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="parallax-container"
                    style={{
                        position: 'relative',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        minHeight: '650px',
                        backgroundColor: '#000',
                        cursor: 'default'
                    }}
                >
                    {/* HD Background with Gaussian Blur */}
                    <div style={{
                        position: 'absolute',
                        top: '-5%', left: '-5%', right: '-5%', bottom: '-5%',
                        backgroundImage: 'url(/office-team.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px) desaturate(0.5)',
                        opacity: 0.6,
                        transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                        transition: 'transform 0.2s ease-out'
                    }} />

                    {/* Main Glass Surface */}
                    <div className="glass-sharp" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                        padding: '5rem 4rem',
                        borderRadius: '32px',
                        maxWidth: '900px',
                        width: '90%',
                        textAlign: 'center',
                        transition: 'transform 0.1s ease-out',
                        zIndex: 10
                    }}>
                        <h2 style={{
                            color: 'var(--color-text)',
                            marginBottom: '3.5rem',
                            fontSize: '4.5rem',
                            fontWeight: 900,
                            fontFamily: 'Inter, sans-serif',
                            textTransform: 'uppercase',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.9
                        }}>
                            Perfect <br />
                            <span style={{ color: 'var(--color-primary)' }}>Job Matches</span>
                        </h2>

                        {/* Dynamic Hovering Tiles */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.5rem',
                            marginBottom: '4rem'
                        }}>
                            {features.map((f, i) => (
                                <div
                                    key={i}
                                    className="glass"
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: '16px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                        boxShadow: `0 ${10 + f.depth}px ${20 + f.depth}px rgba(0,0,0,0.08)`,
                                        transform: `translate(${mousePos.x * f.depth}px, ${mousePos.y * f.depth}px)`,
                                        transition: 'transform 0.15s ease-out',
                                    }}
                                >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                                    <div style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        letterSpacing: '0.15em',
                                        color: 'var(--color-text-muted)',
                                        textAlign: 'center'
                                    }}>
                                        {f.title}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-gradient btn-pill" style={{ padding: '1.25rem 4rem', fontSize: '1.1rem', fontWeight: 800 }}>
                            GET STARTED NOW
                        </button>
                    </div>

                    {/* Decorative floating elements */}
                    <div className="glass" style={{
                        position: 'absolute', top: '15%', left: '10%', padding: '1rem', borderRadius: '50%',
                        transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)`,
                        opacity: 0.4
                    }}>✨</div>
                    <div className="glass" style={{
                        position: 'absolute', bottom: '20%', right: '15%', padding: '1rem', borderRadius: '50%',
                        transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
                        opacity: 0.3
                    }}>🎯</div>
                </div>
            </div>
        </section>
    );
}
