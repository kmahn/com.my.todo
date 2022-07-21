import { HttpExceptionResponse, NotFoundException } from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class UserNotFoundException extends NotFoundException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.USER_NOT_FOUND,
    });
  }
}
