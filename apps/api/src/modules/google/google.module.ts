import { Module } from '@nestjs/common';
import { TypedConfigModule } from '@api/config/typed-config.module';
import { PrismaModule } from '@api/prisma/prisma.module';
import { GoogleAuthService } from './google-auth.service';
import { GoogleCalendarService } from './google-calendar.service';

@Module({
    imports: [TypedConfigModule, PrismaModule],
    providers: [GoogleAuthService, GoogleCalendarService],
    exports: [GoogleAuthService, GoogleCalendarService]
})
export class GoogleModule {}
