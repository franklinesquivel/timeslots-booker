import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
    GoogleCalendarConflictException,
    LocalBookingConflictException
} from '@api/modules/bookings/exceptions/booking.exceptions';
import { GoogleCalendarService } from '@api/modules/google/google-calendar.service';
import { PrismaService } from '@api/prisma/prisma.service';
import { CreateBookingDto } from './zod/booking.zod';

@Injectable()
export class BookingsService {
    constructor(
        private readonly googleCalendarService: GoogleCalendarService,
        private readonly prismaService: PrismaService
    ) {}

    async create(actor: User, createBookingDto: CreateBookingDto) {
        const { endDateTime, startDateTime } = createBookingDto;

        const conflictingBooking = await this.prismaService.timeSlotBooking.findFirst({
            where: {
                status: 'ACTIVE', // Only active bookings
                // The OR operator is used here to group the time-based conditions, ensuring they are evaluated
                // together. This is the standard Prisma pattern for logical grouping, even with a single condition set.
                OR: [
                    {
                        // Checks for any booking that starts before the new booking ends...
                        startDateTime: {
                            lt: endDateTime
                        },
                        // ...and ends after the new booking starts.
                        endDateTime: {
                            gt: startDateTime
                        }
                    }
                ]
            }
        });

        if (conflictingBooking) throw new LocalBookingConflictException();

        // If the actor has the correct Google scopes, we can check for his calendar data
        if (actor.allowedGoogleCalendarAccess) {
            const isAvailable = await this.googleCalendarService.checkUserCalendarsAvailabilityByTimeSlot(
                actor,
                startDateTime.toISOString(),
                endDateTime.toISOString()
            );

            if (!isAvailable) throw new GoogleCalendarConflictException();
        }

        return this.prismaService.timeSlotBooking.create({
            data: { ...createBookingDto, userId: actor.id }
        });
    }
}
