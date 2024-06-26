import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);
// Este comando safeParse vai tentar validar esse process.env para ver
// se ele tem exatamente as variáveis mencionadas acima (NODE_ENV e PORT)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables');
}

const env = _env.data;

export { env };
