import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  URL: z.string(),
  ORIGIN: z.string(),
  KEY: z.string(),
  KEY_PATH: z.string().optional(),
  CERT_PATH: z.string().optional(),
  FTP_HOST: z.string(),
  FTP_USER: z.string(),
  FTP_PASS: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environment variables ', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
