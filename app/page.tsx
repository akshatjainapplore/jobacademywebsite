import ChatWidget from '@/components/ChatWidget';
import LogoMarquee from '@/components/LogoMarquee';
import Image from 'next/image';
import Link from 'next/link';
import ExpandableFAQ from '@/components/ExpandableFAQ';

export default function Home() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Hero Section - Split Layout */}
      <section className="section-break" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="reveal active">
              <h1 style={{ marginBottom: '2rem' }}>
                Find your job, <br />
                <span style={{ color: 'var(--color-primary)' }}>build your career.</span>
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
                Job Academy connects high-impact talent with world-class opportunities through a 25-year legacy of recruitment excellence.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="/careers" className="btn btn-primary btn-pill">Explore Roles</a>
                <a href="/process" className="btn btn-outline btn-pill">Our Process</a>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0, 82, 255, 0.1)'
              }}>
                <Image
                  src="/office-team.png"
                  alt="Success at Job Academy"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Floating Glass Widgets */}
              <div className="glass" style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                padding: '1.5rem 2rem',
                borderRadius: '20px',
                maxWidth: '200px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>10k+</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Placements Completed</div>
              </div>

              <div className="glass" style={{
                position: 'absolute',
                bottom: '15%',
                left: '-10%',
                padding: '1.5rem 2rem',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>✓</div>
                <div>
                  <div style={{ fontWeight: 800 }}>98%</div>
                  <div style={{ fontSize: '0.8rem' }}>Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />

      {/* Process Section - Horizontal Flow */}
      <section className="section-break bg-cool" style={{ backgroundColor: 'rgba(0, 82, 255, 0.03)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>How Job Academy Works</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>A streamlined 3-step path to your next landmark role.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            {[
              { id: '1', title: 'Consultation', text: 'We understand your unique strengths and career goals.' },
              { id: '2', title: 'Selection', text: 'Curated matching with legacy firms in our network.' },
              { id: '3', title: 'Growth', text: 'Seamless onboarding and long-term career support.' }
            ].map(step => (
              <div key={step.id} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  margin: '0 auto 2rem auto',
                  boxShadow: '0 10px 20px rgba(0, 82, 255, 0.3)'
                }}>
                  {step.id}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Blog Section */}
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

      <ChatWidget />
    </main>
  );
}
