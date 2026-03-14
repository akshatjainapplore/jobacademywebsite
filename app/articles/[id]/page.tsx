import React from 'react';
import Link from 'next/link';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Map of article slugs to human-readable titles (for placeholder purposes)
    const titleMap: Record<string, string> = {
        'future-of-remote-tech': 'The Future of Remote Tech Roles',
        'mastering-behavioral-interview': 'Mastering the Behavioral Interview'
    };

    // Create a generic formatted title based on the URL ID if not found in map
    const titleFromId = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const articleTitle = titleMap[id] || titleFromId;

    return (
        <main style={{ backgroundColor: 'var(--color-bg-light)', minHeight: '100vh', padding: '6rem 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
                    &larr; Back to Home
                </Link>

                <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{articleTitle}</h1>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, marginBottom: '3rem', fontSize: '1.1rem' }}>
                    By Job Academy Insights &bull; Read time: 5 mins
                </div>

                <article style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                    <p style={{ marginBottom: '2rem' }}>
                        Welcome to the full article for <strong>{articleTitle}</strong>.
                        In the fast-evolving landscape of modern employment, staying ahead of the curve is paramount.
                        This article dives deep into the strategic shifts and underlying trends that define today's top-tier professional environments.
                    </p>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)', marginTop: '3rem', marginBottom: '1.5rem' }}>The Strategic Advantage</h2>
                    <p style={{ marginBottom: '2rem' }}>
                        Whether you're a seasoned executive navigating a career pivot or a rising star looking for the next highly-impactful role,
                        understanding these dynamics provides a tangible competitive edge. Companies are fundamentally shifting their operational paradigms.
                        We see increased demand for hybrid fluency, asynchronous management skills, and cross-functional agility.
                    </p>

                    <div style={{ backgroundColor: 'rgba(0, 82, 255, 0.05)', borderLeft: '4px solid var(--color-primary)', padding: '2rem', borderRadius: '0 16px 16px 0', margin: '3rem 0' }}>
                        <p style={{ fontSize: '1.3rem', color: 'var(--color-text)', fontStyle: 'italic', margin: 0 }}>
                            "The traditional interview is evolving into a mutual evaluation of long-term adaptability. Candidates who can articulate their learning velocity often out-compete those relying solely on past credentials."
                        </p>
                    </div>

                    <h2 style={{ fontSize: '1.8rem', color: 'var(--color-text)', marginTop: '3rem', marginBottom: '1.5rem' }}>Key Takeaways</h2>
                    <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                        <li style={{ marginBottom: '1rem' }}>Prioritize ongoing upskilling within your niche.</li>
                        <li style={{ marginBottom: '1rem' }}>Develop clear narratives around how you've solved ambiguous problems.</li>
                        <li style={{ marginBottom: '1rem' }}>Leverage networks comprehensively, not just transactionally.</li>
                    </ul>

                    <p>
                        At Job Academy, we help our candidates navigate these exact challenges, providing tailored coaching and direct access to legacy firms that value modern competencies. Connect with our experts today to turn these insights into action.
                    </p>
                </article>

                <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Ready for your next landmark role?</h3>
                    <Link href="/careers" className="btn btn-primary btn-pill">
                        Browse Openings
                    </Link>
                </div>
            </div>
        </main>
    );
}
