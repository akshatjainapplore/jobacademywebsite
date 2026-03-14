import ExpandableFAQ from '@/components/ExpandableFAQ';
import EmployerLeadForm from '@/components/EmployerLeadForm';

export default function ProcessPage() {
    const steps = [
        {
            number: "01",
            title: "Consultation",
            description: "We dive deep into your unique strengths and career aspirations to build a professional roadmap tailored to your potential."
        },
        {
            number: "02",
            title: "Strategic Selection",
            description: "Using our legacy network, we connect you with roles that don't just match your skills, but also your cultural and long-term goals."
        },
        {
            number: "03",
            title: "Expert Screening",
            description: "A refined selection process including technical assessments and behavioral insights to ensure a perfect alignment before the first interview."
        },
        {
            number: "04",
            title: "Precision Matching",
            description: "Direct access to industry leaders. We facilitate transparent, two-way conversations that allow both parties to evaluate the future together."
        },
        {
            number: "05",
            title: "Seamless Onboarding",
            description: "From offer negotiation to your first day, we provide the resources and support to ensure your transition is high-impact and smooth."
        }
    ];

    const faqs = [
        {
            question: "Is it necessary to write a cover letter?",
            answer: "While not mandatory, it is a significant advantage. A cover letter allows you to elaborate on your strengths and show how your competencies specifically relate to the position."
        },
        {
            question: "What characterizes a good CV?",
            answer: "A good CV should complement your cover letter, be well-structured with clear headings, and reflect the specific requirements and language of the job advertisement."
        },
        {
            question: "Can I apply if I have less experience than required?",
            answer: "Yes, you can always apply. Passion and relevant transferable skills can often be just as valuable as direct experience."
        }
    ];

    return (
        <main style={{ backgroundColor: 'var(--color-bg-light)' }}>
            {/* Hero Section */}
            <section className="section-break" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                <div className="container">
                    <h1 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '3.5rem', fontWeight: 900 }}>Your journey to <br /><span style={{ opacity: 0.8 }}>excellence starts here.</span></h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '800px', opacity: 0.9, color: 'white' }}>
                        At Job Academy, we’ve refined the recruitment journey over 25 years to ensure a high-impact, professional experience for every candidate.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="section-break">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div style={{ display: 'grid', gap: '4rem' }}>
                        {steps.map((step, index) => (
                            <div key={step.number} style={{
                                display: 'flex',
                                gap: '3rem',
                                alignItems: 'flex-start',
                                borderLeft: step.number !== "05" ? '2px solid var(--color-primary-soft)' : 'none',
                                paddingLeft: '3rem',
                                paddingBottom: step.number !== "05" ? '4rem' : '0',
                                position: 'relative'
                            }}>
                                <div style={{
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 900,
                                    fontSize: '1.2rem',
                                    flexShrink: 0,
                                    position: 'absolute',
                                    left: '-29px',
                                    top: 0,
                                    boxShadow: '0 10px 20px rgba(0, 82, 255, 0.2)'
                                }}>
                                    {step.number}
                                </div>
                                <div className="glass" style={{
                                    padding: '3rem',
                                    borderRadius: '24px',
                                    flex: 1,
                                    backgroundColor: 'white',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                                }}>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>{step.title}</h3>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Platforms Section */}
            <section className="section-break bg-cool">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            color: 'var(--color-primary)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--color-primary-soft)',
                            borderRadius: '20px'
                        }}>GET DISCOVERED</span>
                        <h2 style={{ marginBottom: '1rem', fontSize: '3rem' }}>India's Top Recruitment Platforms</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Creating profiles on these platforms increases your visibility with top recruiters across the country.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '2rem',
                        marginBottom: '3rem'
                    }}>
                        {[
                            { name: 'Naukri.com', domain: 'naukri.com', url: 'https://www.naukri.com/registration/createAccount', stat: '80M+ Active Users' },
                            { name: 'LinkedIn', domain: 'linkedin.com', url: 'https://www.linkedin.com/signup', stat: '110M+ Users in India' },
                            { name: 'Indeed', domain: 'indeed.com', url: 'https://in.indeed.com/account/signin', stat: '30M+ Monthly Users' },
                            { name: 'Foundit', domain: 'foundit.in', url: 'https://www.foundit.in/seeker/registration', stat: '35M+ Professionals' },
                            { name: 'Shine.com', domain: 'shine.com', url: 'https://www.shine.com/job-seeker/register', stat: '34M+ Registered Users' },
                            { name: 'TimesJobs', domain: 'timesjobs.com', url: 'https://www.timesjobs.com/candidate/register.html', stat: '25M+ Resumes' },
                            { name: 'Glassdoor', domain: 'glassdoor.co.in', url: 'https://www.glassdoor.co.in/profile/newProfile.htm', stat: 'Top Company Reviews' },
                            { name: 'Internshala', domain: 'internshala.com', url: 'https://internshala.com/student/register', stat: '21M+ Students' },
                            { name: 'SimplyHired', domain: 'simplyhired.co.in', url: 'https://www.simplyhired.co.in/auth/register', stat: 'Aggregated Job Engine' },
                            { name: 'Apna', domain: 'apna.co', url: 'https://apna.co/signup', stat: '30M+ Users' },
                            { name: 'Job Hai', domain: 'jobhai.com', url: 'https://www.jobhai.com/register', stat: 'Verified Local Jobs' },
                            { name: 'Work India', domain: 'workindia.in', url: 'https://www.workindia.in/register', stat: '29M+ Blue Collar Workers' },
                            { name: 'Freshersworld', domain: 'freshersworld.com', url: 'https://www.freshersworld.com/login?src=register', stat: '20M+ Freshers' },
                            { name: 'Cutshort', domain: 'cutshort.io', url: 'https://cutshort.io/a/signup', stat: '3M+ Tech Candidates' }
                        ].map(platform => (
                            <div key={platform.name} className="glass platform-card" style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '2rem 1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: '1rem',
                                cursor: 'default'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '12px',
                                    marginBottom: '0.5rem'
                                }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${platform.domain}&size=128`}
                                        alt={`${platform.name} logo`}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
                                    />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.25rem' }}>{platform.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{platform.stat}</p>
                                </div>
                                <a href={platform.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sharp" style={{
                                    width: '100%',
                                    marginTop: 'auto',
                                    padding: '0.75rem',
                                    fontSize: '0.9rem',
                                    display: 'inline-block',
                                    textDecoration: 'none'
                                }}>
                                    Create Profile &rarr;
                                </a>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                            Creating profiles on multiple platforms significantly increases your chances of getting hired.
                        </p>
                    </div>
                </div>
            </section>

            {/* Employer Sourcing Section */}
            <section className="section-break" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            fontWeight: 800,
                            color: 'var(--color-accent)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}>FOR EMPLOYERS</span>
                        <h2 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Hire Industry Leaders</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Access our exclusive pool of pre-vetted professionals and accelerate your team's growth. Let our sourcing experts find your next top performer.
                        </p>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <EmployerLeadForm />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-break" style={{ backgroundColor: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 900 }}>Modernize your career today.</h2>
                    <p style={{ marginBottom: '3rem', fontSize: '1.25rem', opacity: 0.9, color: 'white' }}>
                        Browse high-impact opportunities in our network.
                    </p>
                    <a href="/careers" className="btn btn-glass btn-pill" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>
                        View Openings
                    </a>
                </div>
            </section>
        </main>
    );
}
