import { z } from 'zod';

export const envSchema = z.object({
  // PORTS
  MONOREPO_1_PORT: z.string().default('3000'),
  MONOREPO_2_PORT: z.string().default('3001'),

  // DATABASE
  DATABASE_URL: z.string(),

  // NODE_ENV
  NODE_ENV: z.string().default('development'),
});

export const validateEnv = (config: Record<string, unknown>) => {
  const parsed = envSchema.safeParse(config);

  if (!parsed.success) {
    throw new Error(
      `Env validation error ---> ${JSON.stringify(parsed.error.format())}`,
    );
  }
  return parsed.data;
};

export type ConfigSchemaType = z.infer<typeof envSchema>;
