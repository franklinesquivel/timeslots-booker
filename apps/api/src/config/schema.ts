import z from 'zod';

export const schema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    ENABLE_DATABASE_DEBUG_LOGGING: z
        .enum(['true', 'false'])
        .default('false')
        .transform(v => v === 'true')
});

export type Config = z.infer<typeof schema>;
