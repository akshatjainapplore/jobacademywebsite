'use client';

import JobForm from '@/components/JobForm';
import { useRouter } from 'next/navigation';

export default function NewJobPage() {
    const router = useRouter();

    return (
        <main className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Create New Job</h1>
                <JobForm />
                <div style={{ marginTop: '1rem' }}>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => router.back()}
                        style={{ border: 'none', paddingLeft: 0, color: 'var(--color-primary)' }}
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>
            </div>
        </main>
    );
}
