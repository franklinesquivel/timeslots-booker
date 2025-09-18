import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TraceMiddleware } from './common/middleware/trace.middleware';
import { TraceModule } from './common/trace/trace.module';
import { schema } from './config/schema';
import { TypedConfigModule } from './config/typed-config.module';
import { AuthModule } from './modules/auth/auth.module';
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
        PassportModule.register({ session: false }),
        PrismaModule,
        TraceModule,
        TypedConfigModule
    ]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TraceMiddleware).forRoutes('*');
    }
}
