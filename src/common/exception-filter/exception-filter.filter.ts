import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from 'express';

/**
 * handling Exception Filter
 */
@Catch()
export class ExceptionExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        let ctx = host.switchToHttp();
        let request = ctx.getRequest<Request>();

        let response = ctx.getResponse<Response>();

        console.log(exception)
        let status = exception.getStatus();

        return response.status(status).json({
            statusCode: status,
            data: null,
            message: exception?.message,
            url: request.url,
            time: new Date().toISOString()
        });
    }
}