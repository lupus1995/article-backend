import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {errorParamsOrExistArticle, errorParamsOrExistArticleMessage} from '../ErrorCodes';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const responseError: any = exception.getResponse();
        const text = responseError.message[0].constraints.customText;
        const code = Number(text);
        let message: string | undefined;
        if (responseError.message[0].constraints.customText) {
            message = responseError.message[0].constraints.customText;
        } else if (responseError.message[0].constraints.maxLength) {
            message = responseError.message[0].constraints.maxLength;
        } else if (responseError.message[0].constraints.mimLength) {
            message = responseError.message[0].constraints.minLength;
        }

        response
            // @ts-ignore
            .status(status)
            .json({code, message});
    }
}
