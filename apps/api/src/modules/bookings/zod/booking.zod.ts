import { BookingStatus } from '@prisma/client';
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

/**
 * Defines the public data contract for a booking. This schema is used to shape the data sent back to the client,
 * ensuring that internal or sensitive fields (like `userId`) are not exposed.
 *
 * Also helps to enforce the API response consistency between endpoints.
 */
export const BookingResponseSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    status: z.enum(BookingStatus)
});

export type BookingResponseDto = z.infer<typeof BookingResponseSchema>;
