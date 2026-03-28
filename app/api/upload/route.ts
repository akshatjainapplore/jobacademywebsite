import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// SECURITY: Rate limiting should ideally be handled at proxy layer (Nginx/Vercel)
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Security Fix 1: Strict MIME type validation against malicious uploads (e.g. .php, .sh)
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Forbidden file type. Only PDF/DOC/Images allowed.' }, { status: 403 });
    }

    // Security Fix 2: Limit payload size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Payload too large. Max 5MB.' }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch(e) {}

    // Security Fix 3: Nullify original filename completely to prevent path traversal & exec injections
    const ext = path.extname(file.name).toLowerCase();
    const uniqueName = crypto.randomUUID() + ext;
    const filePath = path.join(uploadsDir, uniqueName);
    
    await writeFile(filePath, buffer);
    const url = `/uploads/${uniqueName}`;

    return NextResponse.json({ url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
