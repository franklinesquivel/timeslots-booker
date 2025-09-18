import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(err => {
    // Handle exception explicitly to avoid `unhandled promise` warning.
    console.error('Application failed to start:', err);
    process.exit(1);
});
