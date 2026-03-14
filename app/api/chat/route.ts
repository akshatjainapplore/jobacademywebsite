import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
// START SECURITY NOTICE
// Ideally, GEMINI_API_KEY should be in process.env.
// For this demo environment, if the user hasn't set it, we might need a fallback or placeholder.
// We will use process.env.GEMINI_API_KEY as requested.
// END SECURITY NOTICE

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY is not set');
            return NextResponse.json({
                text: "I'm sorry, I cannot connect to my brain right now. Please tell the admin to configure my API key."
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const systemPrompt = `You are an AI assistant for Job Academy, a recruitment firm with 25+ years of experience in training-led hiring.
Your role is to:
- Help candidates understand job roles and career opportunities
- Explain Job Academy’s recruitment process
- Guide users to the Careers page when relevant
Be professional, concise, and helpful.
Do not invent job openings or company policies.
If unsure, recommend applying or contacting Job Academy.`;

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am ready to assist as the Job Academy AI assistant.' }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({
            text: "I'm having trouble thinking right now. Please try again later."
        }, { status: 500 });
    }
}
