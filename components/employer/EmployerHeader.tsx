'use client';
import { useRouter } from 'next/navigation';

export function EmployerHeader() {
  const router = useRouter();
  
  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/;';
    router.push('/login');
  };

  return (
    <header className="glass" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--color-border-glass)' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button className="btn btn-glass btn-sharp" style={{ padding: '0.5rem 1rem' }}>
          Notifications
        </button>
        <button onClick={handleLogout} className="btn btn-outline btn-sharp" style={{ padding: '0.5rem 1rem', borderColor: 'var(--color-text-muted)', color: 'var(--color-text-muted)' }}>
          Logout
        </button>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-primary)' }}></div>
      </div>
    </header>
  );
}
