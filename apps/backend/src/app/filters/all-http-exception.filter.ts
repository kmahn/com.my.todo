import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AccessTokenExpiredException } from '../auth/exceptions/access-token-expired.exception';
import { LoginRequiredException } from '../auth/exceptions/login-required.exception';

@Catch()
export class AllHttpExceptionFilter extends BaseExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    // super.catch(exception, host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { message } = request.authInfo || {};

    if (message === 'jwt expired') {
      exception = new AccessTokenExpiredException();
    } else if (message === 'No auth token') {
      exception = new LoginRequiredException();
    }

    Logger.debug(exception);

    const responseBody = {
      ...exception.getResponse(),
      status: exception.getStatus()
    };

    delete responseBody.statusCode;

    response.status(exception.status).json(responseBody);
  }
}
