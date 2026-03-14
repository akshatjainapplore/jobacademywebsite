import { NextResponse } from 'next/server';
import { getApplications, saveApplications } from '@/lib/data';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        const apps = getApplications();
        const appIndex = apps.findIndex((a: any) => a.id === id);

        if (appIndex === -1) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 });
        }

        apps[appIndex].status = status;
        saveApplications(apps);

        return NextResponse.json({ success: true, application: apps[appIndex] });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
