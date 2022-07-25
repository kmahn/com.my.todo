import {
  BadRequestException,
  HttpExceptionResponse,
} from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class EmailUsedException extends BadRequestException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.EMAIL_USED,
    });
  }
}
