import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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
        if (actor.allowedGoogleCalendarAccess) {
            const { endDateTime, startDateTime } = createBookingDto;

            const isAvailable = await this.googleCalendarService.checkUserCalendarsAvailabilityByTimeSlot(
                actor,
                startDateTime.toISOString(),
                endDateTime.toISOString()
            );

            if (!isAvailable)
                throw new ConflictException('The selected time slot conflicts with the user Google Calendar data');
        }

        // WIP: Add local validation of bookings conflicts

        return this.prismaService.timeSlotBooking.create({
            data: { ...createBookingDto, userId: actor.id }
        });
    }
}
