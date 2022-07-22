import { HttpExceptionResponse, UnauthorizedException } from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class AccessTokenExpiredException extends UnauthorizedException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.ACCESS_TOKEN_EXPIRED
    });
  }
}
