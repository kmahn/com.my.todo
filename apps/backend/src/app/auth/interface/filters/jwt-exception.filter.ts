import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@td/backend/exception';
import { AccessTokenExpiredException } from '../../exceptions/access-token-expired.exception';
import { LoginRequiredException } from '../../exceptions/login-required.exception';

@Catch(HttpException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    if (request.authInfo) {
      const { message } = request.authInfo as Error;
      if (message === 'jwt expired') {
        throw new AccessTokenExpiredException();
      }
      throw new LoginRequiredException();
    }

    throw exception;
  }
}
