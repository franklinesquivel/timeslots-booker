import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus, TimeSlotBooking, User } from '@prisma/client';
import {
    GoogleCalendarConflictException,
    LocalBookingConflictException
} from '@api/modules/bookings/exceptions/booking.exceptions';
import { GoogleCalendarService } from '@api/modules/google/google-calendar.service';
import { PrismaService } from '@api/prisma/prisma.service';
import { BookingResponseDto, CreateBookingDto } from './zod/booking.zod';

@Injectable()
export class BookingsService {
    constructor(
        private readonly googleCalendarService: GoogleCalendarService,
        private readonly prismaService: PrismaService
    ) {}

    private mapToResponseDto(booking: TimeSlotBooking): BookingResponseDto {
        return {
            id: booking.id,
            name: booking.name,
            startDateTime: booking.startDateTime,
            endDateTime: booking.endDateTime,
            status: booking.status
        };
    }

    async create(actor: User, createBookingDto: CreateBookingDto): Promise<BookingResponseDto> {
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

        const createdBooking = await this.prismaService.timeSlotBooking.create({
            data: { ...createBookingDto, userId: actor.id }
        });

        return this.mapToResponseDto(createdBooking);
    }

    async getUserBookings(actor: User): Promise<BookingResponseDto[]> {
        const bookings = await this.prismaService.timeSlotBooking.findMany({
            where: { userId: actor.id }
        });

        return bookings.map(b => this.mapToResponseDto(b));
    }

    async cancelBooking(actor: User, bookingId: string): Promise<void> {
        const result = await this.prismaService.timeSlotBooking.updateMany({
            where: {
                id: bookingId,
                status: BookingStatus.ACTIVE, // Only active bookings
                userId: actor.id // Check for ownership directly in the where clause
            },
            data: {
                status: BookingStatus.CANCELLED
            }
        });

        // If no rows were updated, it means the booking was not found for this user.
        if (result.count === 0) {
            throw new NotFoundException("Booking not found or you don't have permission to cancel it.");
        }
    }
}
