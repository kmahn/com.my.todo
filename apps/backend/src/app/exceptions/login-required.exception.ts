import {
  HttpExceptionResponse,
  UnauthorizedException,
} from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class LoginRequiredException extends UnauthorizedException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.LOGIN_REQUIRED,
    });

  }

}
