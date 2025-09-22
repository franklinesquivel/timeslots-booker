import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as http from 'node:http';
import { getMessageFromUnknownError } from '@api/common/utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const reason = http.STATUS_CODES[status] ?? 'Internal Server Error';
        const message = getMessageFromUnknownError(exception);
        const context = exception instanceof HttpException ? exception.cause : undefined;

        // Custom error code handler -- Will be present in some HttpException cases
        let errorCode: string | undefined;

        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();

            if (
                typeof exceptionResponse === 'object' &&
                'errorCode' in exceptionResponse &&
                typeof exceptionResponse.errorCode === 'string'
            ) {
                errorCode = exceptionResponse.errorCode;
            }
        }

        response.status(status).json({
            trace: response.getHeader('x-trace-id') ?? null,
            status,
            ...(errorCode && { code: errorCode }), // add code to payload if present
            reason,
            message,
            timestamp: new Date().toISOString(),
            context
        });
    }
}
