import z from 'zod';

export const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    ENABLE_DATABASE_DEBUG_LOGGING: z.coerce.boolean().default(false)
});

export type Config = z.infer<typeof schema>;
