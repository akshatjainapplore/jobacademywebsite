import { PrismaClient } from '@prisma/client'
import path from 'path';
import fs from 'fs';

const prismaClientSingleton = () => {
  if (process.env.NODE_ENV === 'production') {
    // Vercel serverless environment is read-only. We must push SQLite to /tmp to avoid immediate crashes.
    const tmpObj = '/tmp/dev.db';
    if (!fs.existsSync(tmpObj)) {
      try {
        const rootDb = path.join(process.cwd(), 'dev.db');
        const prismaDb = path.join(process.cwd(), 'prisma', 'dev.db');
        if (fs.existsSync(rootDb)) {
          fs.copyFileSync(rootDb, tmpObj);
        } else if (fs.existsSync(prismaDb)) {
          fs.copyFileSync(prismaDb, tmpObj);
        }
      } catch (e) {
        console.error('SQLite /tmp replication failed:', e);
      }
    }
    return new PrismaClient({
      datasources: {
        db: {
          url: 'file:/tmp/dev.db'
        }
      }
    });
  }

  // Local development default
  return new PrismaClient();
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
