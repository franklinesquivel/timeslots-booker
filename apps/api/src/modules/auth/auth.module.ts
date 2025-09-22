import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypedConfigService } from '@api/config/typed-config.service';
import { GoogleModule } from '@api/modules/google/google.module';
import { PrismaModule } from '@api/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        GoogleModule,
        JwtModule.registerAsync({
            inject: [TypedConfigService],
            useFactory: (configService: TypedConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '1d' }
            })
        }),
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, JwtStrategy]
})
export class AuthModule {}
