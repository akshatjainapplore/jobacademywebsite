'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import JobForm from '@/components/JobForm';

export default function EditJobPage() {
    const params = useParams(); // useParams returns params directly in Client Components
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // In Next.js 15+, params is a Promise in Server Components but useParams hook handles it in Client Components. 
    // However, `useParams` returns `ReadonlyURLSearchParams | null`. Wait, no, `useParams` returns an object.
    // The user environment is likely Next 14 or latest. 

    useEffect(() => {
        // Handling the potential Promise/async nature or just standard ID
        const fetchJob = async () => {
            try {
                // params.id might be available directly
                const id = params?.id;
                if (!id) return;

                const res = await fetch(`/api/jobs/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setJob(data);
                } else {
                    alert('Job not found');
                    router.push('/admin');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [params, router]);

    if (loading) return <div className="section container">Loading...</div>;
    if (!job) return <div className="section container">Job not found</div>;

    return (
        <main className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ marginBottom: '2rem' }}>Edit Job</h1>
                <JobForm initialData={job} isEdit={true} />
            </div>
        </main>
    );
}
