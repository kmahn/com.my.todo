import { ErrorCode } from './error-code';

export interface ErrorResponse {
  status: number;
  code: ErrorCode;
}
