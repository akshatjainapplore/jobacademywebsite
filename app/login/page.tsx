'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.user.role === 'ADMIN') router.push('/admin');
      else if (data.user.role === 'EMPLOYER') router.push('/employer');
      else router.push('/candidate');
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--color-bg-secondary)' }}>
      <form onSubmit={handleLogin} className="glass glass-sharp" style={{ padding: '3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px', background: 'white', border: '1px solid var(--color-border-glass)' }}>
        <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '1rem', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>Welcome Back</h1>
        
        {error && <div style={{ color: 'white', background: '#ef4444', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', fontWeight: 600 }}>{error}</div>}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text)' }}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', color: '#0f172a' }} placeholder="you@example.com" />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text)' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc', color: '#0f172a' }} placeholder="••••••••" />
        </div>

        <button type="submit" className="btn btn-sharp btn-gradient" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }}>Access Dashboard</button>
      </form>
    </div>
  );
}
