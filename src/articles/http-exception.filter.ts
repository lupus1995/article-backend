import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const responseError: any = exception.getResponse();

        console.log('response', responseError.message[0].constraints.customText);

        response
            // @ts-ignore
            .status(status)
            .json({code: Number(responseError.message[0].constraints.customText)});
    }
}
