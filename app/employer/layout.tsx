import React from 'react';
import { EmployerSidebar } from '@/components/employer/EmployerSidebar';
import { EmployerHeader } from '@/components/employer/EmployerHeader';

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-bg-secondary)', overflow: 'hidden' }}>
      <EmployerSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <EmployerHeader />
        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
