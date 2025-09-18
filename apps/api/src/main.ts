import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.enableShutdownHooks();

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(err => {
    // Log the error to the console or a logging service
    console.error('Application failed to start:', err);
    // Exit the process with a non-zero exit code to indicate failure
    process.exit(1);
});
