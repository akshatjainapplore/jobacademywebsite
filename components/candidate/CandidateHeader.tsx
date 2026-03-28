'use client';
import { useRouter } from 'next/navigation';

export function CandidateHeader() {
  const router = useRouter();
  
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/login');
  };

  return (
    <header className="glass" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--color-border-glass)' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button className="btn btn-glass btn-sharp" style={{ padding: '0.5rem 1rem' }}>
          Alerts <span style={{ background: '#ef4444', color: 'white', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem', marginLeft: '0.5rem' }}>2</span>
        </button>
        <button onClick={handleLogout} className="btn btn-outline btn-sharp" style={{ padding: '0.5rem 1rem', borderColor: 'var(--color-text-muted)', color: 'var(--color-text-muted)' }}>
          Logout
        </button>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}></div>
      </div>
    </header>
  );
}
