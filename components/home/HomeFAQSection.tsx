import Link from 'next/link';
import ExpandableFAQ from '@/components/ExpandableFAQ';

export function HomeFAQSection() {
    return (
        <section className="section-break bg-cool">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '6rem' }}>
                    <div>
                        <h2 style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                        <ExpandableFAQ faqs={[
                            { question: 'How do I submit my resume?', answer: 'You can upload your PDF resume directly on any job page using our modern application portal.' },
                            { question: 'What industries do you serve?', answer: 'We specialize in Tech, Finance, and Executive roles globally, partnering with top-tier organizations.' },
                            { question: 'Is there a consultation fee?', answer: 'No, Job Academy is completely free for candidates. Our network of employers covers all consultation costs.' }
                        ]} />
                    </div>

                    <div>
                        <h2 style={{ marginBottom: '3rem' }}>Latest Career Advice</h2>
                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {[
                                { title: 'The Future of Remote Tech Roles', date: 'Jan 24, 2026', id: 'future-of-remote-tech' },
                                { title: 'Mastering the Behavioral Interview', date: 'Jan 20, 2026', id: 'mastering-behavioral-interview' }
                            ].map((post, i) => (
                                <div key={i} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '24px',
                                    padding: '2rem',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem'
                                }}>
                                    <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8rem' }}>{post.date}</span>
                                    <h3 style={{ fontSize: '1.5rem' }}>{post.title}</h3>
                                    <Link href={`/articles/${post.id}`} style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
                                        Read Article &rarr;
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
