import { applyDecorators, UseFilters, UseGuards } from '@nestjs/common';
import { ApiExceptions } from '@td/backend/util';
import { AccessTokenExpiredException } from '../../exceptions/access-token-expired.exception';
import { LoginRequiredException } from '../../exceptions/login-required.exception';
import { JwtExceptionFilter } from '../filters/jwt-exception.filter';
import { JwtGuard } from '../../guards/jwt.guard';

export function Auth() {
  return applyDecorators(
    ApiExceptions(LoginRequiredException, AccessTokenExpiredException),
    UseFilters(JwtExceptionFilter),
    UseGuards(JwtGuard),
  );
}
