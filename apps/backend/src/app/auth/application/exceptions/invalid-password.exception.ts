import {
  BadRequestException,
  HttpExceptionResponse,
} from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class InvalidPasswordException extends BadRequestException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.INVALID_PASSWORD,
    });
  }
}
