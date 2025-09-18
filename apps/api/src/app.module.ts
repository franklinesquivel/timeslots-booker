import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { schema } from '@api/config/schema';
import { TypedConfigModule } from '@api/config/typed-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GoogleModule } from './google/google.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: env => schema.parse(env)
        }),

        AuthModule,
        GoogleModule,
        PassportModule.register({ session: false }), // stateless config - for api <-> client communication
        PrismaModule,
        TypedConfigModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
