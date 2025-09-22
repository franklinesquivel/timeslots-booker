import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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
    async create(
        @Req() req: AuthenticatedRequest,
        @Body(new ZodValidationPipe(CreateBookingSchema)) createBookingDto: CreateBookingDto
    ): Promise<TimeSlotBooking> {
        return await this.bookingsService.create(req.user, createBookingDto);
    }

    @Get()
    findAll(@Req() _req: AuthenticatedRequest) {
        throw new NotImplementedException();
    }

    @Post(':id/cancel')
    cancel(@Req() _req: AuthenticatedRequest, @Param('id') _id: string) {
        throw new NotImplementedException();
    }
}
