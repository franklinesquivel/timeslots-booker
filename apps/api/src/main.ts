import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { getMessageFromUnknownError } from './common/utils';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new AllExceptionsFilter());
    app.enableShutdownHooks();

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(err => {
    // Handle exception explicitly to avoid `unhandled promise` warning.
    console.error('Application failed to start', { error: getMessageFromUnknownError(err) });
    process.exit(1);
});
