import { NextResponse } from 'next/server';
import { getAds, addAd, saveAds } from '@/lib/data';

export async function GET() {
    const ads = getAds();
    return NextResponse.json(ads);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // body might be { title: string, imageUrl: string, link: string }
        const newAd = addAd(body);
        return NextResponse.json({ success: true, ad: newAd });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        // Simple implementation for toggling ad active status
        const body = await request.json();
        const { id, isActive } = body;

        const ads = getAds();
        const adIndex = ads.findIndex((a: any) => a.id === id);

        if (adIndex !== -1) {
            ads[adIndex].isActive = isActive;
            saveAds(ads);
            return NextResponse.json({ success: true, ad: ads[adIndex] });
        }
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
