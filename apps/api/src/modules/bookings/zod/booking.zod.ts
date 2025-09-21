import { z } from 'zod';

export const CreateBookingSchema = z
    .object({
        name: z.string().min(1),
        startDateTime: z.iso.datetime().transform(v => new Date(v)),
        endDateTime: z.iso.datetime().transform(v => new Date(v))
    })
    .refine(data => data.endDateTime > data.startDateTime, {
        message: 'End date must be after start date',
        path: ['endDateTime']
    });

export type CreateBookingDto = z.infer<typeof CreateBookingSchema>;
