import {
  HttpExceptionResponse,
  NotFoundException,
} from '@td/backend/exception';
import { ErrorCode } from '@td/common/error';

export class TodoNotFoundException extends NotFoundException {
  constructor(response?: HttpExceptionResponse) {
    super({
      ...response,
      code: ErrorCode.TODO_NOT_FOUND,
    });
  }
}

