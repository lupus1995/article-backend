import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const responseError: any = exception.getResponse();
        let message: string | undefined;
        if (responseError.message[0].constraints.customText) {
            message = responseError.message[0].constraints.customText;
        } else if (responseError.message[0].constraints.maxLength) {
            message = responseError.message[0].constraints.maxLength;
        } else if (responseError.message[0].constraints.minLength) {
            message = responseError.message[0].constraints.minLength;
        } else if (responseError.message[0].constraints.field) {
            message = responseError.message[0].constraints.field;
        }

        console.log(responseError.message[0].constraints);

        response
            // @ts-ignore
            .status(status)
            .json({statusCode: status, message});
    }
}
