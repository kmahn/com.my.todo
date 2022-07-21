import {
  BadRequestException as NestBadRequestException,
  BadGatewayException as NestBadGatewayException,
  ConflictException as NestConflictException,
  ForbiddenException as NestForbiddenException,
  GatewayTimeoutException as NestGatewayTimeoutException,
  GoneException as NestGoneException,
  HttpException as NestHttpException,
  HttpStatus,
  HttpVersionNotSupportedException as NestHttpVersionNotSupportedException,
  ImATeapotException as NestImATeapotException,
  InternalServerErrorException as NestInternalServerErrorException,
  MethodNotAllowedException as NestMethodNotAllowedException,
  NotAcceptableException as NestNotAcceptableException,
  NotFoundException as NestNotFoundException,
  NotImplementedException as NestNotImplementedException,
  PayloadTooLargeException as NestPayloadTooLargeException,
  PreconditionFailedException as NestPreconditionFailedException,
  RequestTimeoutException as NestRequestTimeoutException,
  ServiceUnavailableException as NestServiceUnavailableException,
  UnauthorizedException as NestUnauthorizedException,
  UnprocessableEntityException as NestUnprocessableEntityException,
  UnsupportedMediaTypeException as NestUnsupportedMediaTypeException,
} from '@nestjs/common';
import { ErrorResponse } from '@td/common/error';

export type HttpExceptionResponse = Partial<ErrorResponse>;

export class HttpException extends NestHttpException {
  constructor(response: ErrorResponse) {
    super(response, response.status);
  }
}

export class BadGatewayException extends NestBadGatewayException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.BAD_GATEWAY,
    });
  }
}

export class BadRequestException extends NestBadRequestException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class ConflictException extends NestConflictException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.CONFLICT,
    });
  }
}

export class ForbiddenException extends NestForbiddenException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.FORBIDDEN,
    });
  }
}

export class GatewayTimeoutException extends NestGatewayTimeoutException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.GATEWAY_TIMEOUT,
    });
  }
}

export class GoneException extends NestGoneException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.GONE,
    });
  }
}

export class HttpVersionNotSupportedException extends NestHttpVersionNotSupportedException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    });
  }
}

export class ImATeapotException extends NestImATeapotException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.I_AM_A_TEAPOT,
    });
  }
}

export class InternalServerErrorException extends NestInternalServerErrorException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}

export class MethodNotAllowedException extends NestMethodNotAllowedException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.METHOD_NOT_ALLOWED,
    });
  }
}

export class NotAcceptableException extends NestNotAcceptableException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.NOT_ACCEPTABLE,
    });
  }
}

export class NotFoundException extends NestNotFoundException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class NotImplementedException extends NestNotImplementedException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.NOT_IMPLEMENTED,
    });
  }
}

export class PayloadTooLargeException extends NestPayloadTooLargeException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.PAYLOAD_TOO_LARGE,
    });
  }
}

export class PreconditionFailedException extends NestPreconditionFailedException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.PRECONDITION_FAILED,
    });
  }
}

export class RequestTimeoutException extends NestRequestTimeoutException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.REQUEST_TIMEOUT,
    });
  }
}

export class ServiceUnavailableException extends NestServiceUnavailableException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.SERVICE_UNAVAILABLE,
    });
  }
}

export class UnauthorizedException extends NestUnauthorizedException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class UnprocessableEntityException extends NestUnprocessableEntityException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}

export class UnsupportedMediaTypeException extends NestUnsupportedMediaTypeException {
  constructor(response: HttpExceptionResponse) {
    super({
      ...response,
      status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    });
  }
}
