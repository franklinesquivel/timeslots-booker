import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        let reason: string;
        let message: string;

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                reason = exception.message;
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                const responseObject = exceptionResponse as {
                    reason?: string;
                    message?: string | string[];
                    error?: string;
                };

                reason = responseObject.reason ?? responseObject.error ?? 'Internal Server Error';

                const msg = responseObject.message ?? exception.message;
                message = Array.isArray(msg) ? msg.join(', ') : msg;
            } else {
                reason = 'Internal Server Error';
                message = 'An unexpected error occurred';
            }
        } else {
            reason = 'Internal Server Error';
            message = exception instanceof Error ? exception.message : 'An unexpected error occurred';
        }

        response.status(status).json({
            trace: response.getHeader('x-trace-id') ?? null,
            status: status,
            reason,
            message,
            timestamp: new Date().toISOString()
        });
    }
}
