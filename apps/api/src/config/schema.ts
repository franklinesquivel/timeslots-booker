import z from 'zod';

export const schema = z.object({
    DATABASE_URL: z.url(),
    ENABLE_DATABASE_DEBUG_LOGGING: z
        .enum(['true', 'false'])
        .default('false')
        .transform(v => v === 'true'),
    GOOGLE_CALLBACK_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3000)
});

export type Config = z.infer<typeof schema>;
