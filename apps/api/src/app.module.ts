import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { schema } from './config/schema';
import { TypedConfigModule } from './config/typed-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { GoogleModule } from './modules/google/google.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: env => schema.parse(env)
        }),

        AuthModule,
        GoogleModule,
        CalendarModule,
        PassportModule.register({ session: false }), // stateless config - for api <-> client communication
        PrismaModule,
        TypedConfigModule
    ]
})
export class AppModule {}
