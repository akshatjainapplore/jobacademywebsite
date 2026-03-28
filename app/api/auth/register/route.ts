import { NextResponse } from 'next/server';
import { registerEmployer, registerCandidate } from '@/services/user.service';
import { RegisterEmployerSchema, RegisterCandidateSchema } from '@/lib/validations';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role } = body;
    
    let result;
    if (role === 'EMPLOYER') {
      const parsed = RegisterEmployerSchema.parse(body);
      result = await registerEmployer(parsed);
    } else if (role === 'CANDIDATE') {
      const parsed = RegisterCandidateSchema.parse(body);
      result = await registerCandidate(parsed);
    } else {
      throw new Error('Invalid role');
    }

    const response = NextResponse.json({ user: result.user });
    
    response.cookies.set('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const zodError = error as any;
      return NextResponse.json({ error: zodError.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
