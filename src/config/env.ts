import dotenv from 'dotenv'
import { z } from 'zod';


dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000 as number,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().regex(/^\d+$/),
  MONGODB_URI: z.string().url(),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error(parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
