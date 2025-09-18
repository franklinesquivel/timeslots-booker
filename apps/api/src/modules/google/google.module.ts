import { Module } from '@nestjs/common';
import { TypedConfigModule } from '@api/config/typed-config.module';
import { PrismaModule } from '@api/prisma/prisma.module';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
    imports: [TypedConfigModule, PrismaModule],
    providers: [GoogleCalendarService],
    exports: [GoogleCalendarService]
})
export class GoogleModule {}
