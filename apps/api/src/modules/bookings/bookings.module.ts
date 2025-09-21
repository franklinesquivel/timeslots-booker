import { Module } from '@nestjs/common';
import { GoogleModule } from '@api/modules/google/google.module';
import { PrismaModule } from '@api/prisma/prisma.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
    imports: [GoogleModule, PrismaModule],
    providers: [BookingsService],
    controllers: [BookingsController]
})
export class BookingsModule {}
