import dayjs from 'dayjs';
import { z } from 'zod';

export const createBookingSchema = z
    .object({
        name: z.string().min(3, 'Booking name must be at least 3 characters long'),
        startDateTime: z.string().refine(val => dayjs(val).isValid(), {
            message: 'Please select a valid start date and time'
        }),
        endDateTime: z.string().refine(val => dayjs(val).isValid(), {
            message: 'Please select a valid end date and time'
        })
    })
    .refine(
        data => {
            const start = dayjs(data.startDateTime);
            const end = dayjs(data.endDateTime);
            return end.isAfter(start);
        },
        {
            message: 'End date and time must be after the start date and time',
            path: ['endDateTime'] // Assign the error to the endDateTime field
        }
    );

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
