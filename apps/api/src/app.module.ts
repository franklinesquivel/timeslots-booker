import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schema } from '@api/config/schema';
import { TypedConfigModule } from '@api/config/typed-config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate: env => schema.parse(env)
        }),
        TypedConfigModule,
        PrismaModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
