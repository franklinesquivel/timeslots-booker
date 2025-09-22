import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TimeSlotBooking } from '@prisma/client';
import { ZodValidationPipe } from '@api/common/pipes/zod-validation.pipe';
import type { AuthenticatedRequest } from '@api/types/express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingsService } from './bookings.service';
import type { CreateBookingDto } from './zod/booking.zod';
import { CreateBookingSchema } from './zod/booking.zod';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Req() req: AuthenticatedRequest,
        @Body(new ZodValidationPipe(CreateBookingSchema)) createBookingDto: CreateBookingDto
    ): Promise<TimeSlotBooking> {
        return await this.bookingsService.create(req.user, createBookingDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Req() req: AuthenticatedRequest): Promise<TimeSlotBooking[]> {
        return this.bookingsService.getUserBookings(req.user);
    }

    @Post(':id/cancel')
    @HttpCode(HttpStatus.NO_CONTENT)
    async cancel(@Req() req: AuthenticatedRequest, @Param('id') id: string): Promise<void> {
        await this.bookingsService.cancelBooking(req.user, id);
    }
}
