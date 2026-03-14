import { NextResponse } from 'next/server';
import { getLeads, addLead } from '@/lib/data';

export async function GET() {
    const leads = getLeads();
    return NextResponse.json(leads);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newLead = addLead(body);
        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
