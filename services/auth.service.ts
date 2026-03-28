import { SignJWT, jwtVerify } from 'jose';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('FATAL SECURITY ERROR: JWT_SECRET environment variable must be provided in production.');
}

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-12345';
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload {
  userId: string;
  role: 'EMPLOYER' | 'CANDIDATE' | 'ADMIN';
  email: string;
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function verifyToken(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as SessionPayload;
  } catch (error) {
    return null;
  }
}
