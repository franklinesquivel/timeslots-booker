import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotImplementedException,
    Param,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
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
    async create(@Req() req: AuthenticatedRequest, @Body() createBookingDto: CreateBookingDto) {
        const validation = CreateBookingSchema.safeParse(createBookingDto);

        if (!validation.success) {
            throw new BadRequestException('Invalid payload', {
                cause: {
                    errors: validation.error.issues
                }
            });
        }

        return await this.bookingsService.create(req.user, validation.data);
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
