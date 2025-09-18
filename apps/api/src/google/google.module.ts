import { Module } from '@nestjs/common';
import { TypedConfigModule } from '../config/typed-config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
    imports: [TypedConfigModule, PrismaModule],
    providers: [GoogleCalendarService],
    exports: [GoogleCalendarService]
})
export class GoogleModule {}
