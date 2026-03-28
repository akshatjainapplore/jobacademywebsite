import React from 'react';
import { CandidateSidebar } from '@/components/candidate/CandidateSidebar';
import { CandidateHeader } from '@/components/candidate/CandidateHeader';

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--color-bg-secondary)', overflow: 'hidden' }}>
      <CandidateSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CandidateHeader />
        <main style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
