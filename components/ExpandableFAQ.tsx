'use client';

import { useState } from 'react';

type FAQItem = {
    question: string;
    answer: string;
};

export default function ExpandableFAQ({ faqs }: { faqs: FAQItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            border: '1px solid #e2e8f0',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            style={{
                                width: '100%',
                                padding: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: 'var(--color-text)'
                            }}
                        >
                            <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>{item.question}</span>
                            <span style={{
                                fontSize: '1.5rem',
                                color: 'var(--color-primary)',
                                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease',
                                display: 'inline-block',
                                lineHeight: 1
                            }}>
                                +
                            </span>
                        </button>

                        <div style={{
                            maxHeight: isOpen ? '500px' : '0',
                            opacity: isOpen ? 1 : 0,
                            overflow: 'hidden',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            padding: isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem'
                        }}>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
