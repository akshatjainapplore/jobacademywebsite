import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ManageUsers() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            companyProfile: true,
            candidateProfile: true
        }
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>Manage Users</h1>
                    <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>View and manage all registered accounts on the platform securely.</p>
                </div>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
                    <thead style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <tr>
                            <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#94a3b8' }}>Account Email</th>
                            <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#94a3b8' }}>Security Role</th>
                            <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#94a3b8' }}>Profile Name</th>
                            <th style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#94a3b8' }}>Registered On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 500 }}>{user.email}</td>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '50px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        backgroundColor: user.role === 'ADMIN' ? 'rgba(239, 68, 68, 0.2)' : user.role === 'EMPLOYER' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                        color: user.role === 'ADMIN' ? '#fca5a5' : user.role === 'EMPLOYER' ? '#93c5fd' : '#6ee7b7'
                                    }}>
                                        {user.role}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                                    {user.role === 'EMPLOYER' && user.companyProfile ? user.companyProfile.companyName : ''}
                                    {user.role === 'CANDIDATE' && user.candidateProfile ? `${user.candidateProfile.firstName} ${user.candidateProfile.lastName}` : ''}
                                    {user.role === 'ADMIN' ? 'System Administrator' : ''}
                                    {!user.companyProfile && !user.candidateProfile && user.role !== 'ADMIN' ? 'Pending Profile Completion' : ''}
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', color: '#94a3b8' }}>
                                    {user.createdAt.toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
