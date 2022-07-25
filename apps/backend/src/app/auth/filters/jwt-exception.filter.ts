import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException as NestHttpException,
} from '@nestjs/common';
import { HttpException } from '@td/backend/exception';
import {
  AccessTokenExpiredException,
} from '../../exceptions/access-token-expired.exception';
import {
  LoginRequiredException,
} from '../../exceptions/login-required.exception';

@Catch(HttpException, NestHttpException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    if (request.authInfo) {
      const { message } = request.authInfo as Error;
      if (message === 'jwt expired') {
        exception = new AccessTokenExpiredException();
      }
      else if (message === 'No auth token') {
        exception = new LoginRequiredException();
      }
    }

    const responseBody = {
      ...exception.getResponse(),
      status: exception.getStatus()
    }

    delete responseBody.statusCode;

    response.status(exception.status).json(responseBody);
  }
}
