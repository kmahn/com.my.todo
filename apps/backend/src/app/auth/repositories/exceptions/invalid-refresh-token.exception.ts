import {
  HttpExceptionResponse,
  UnauthorizedException,
} from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.INVALID_REFRESH_TOKEN,
    });
  }
}
