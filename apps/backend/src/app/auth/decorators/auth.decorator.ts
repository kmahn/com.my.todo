import { applyDecorators, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiExceptions } from '@td/backend/util';
import {
  AccessTokenExpiredException,
} from '../../exceptions/access-token-expired.exception';
import {
  LoginRequiredException,
} from '../../exceptions/login-required.exception';
import { JwtExceptionFilter } from '../filters/jwt-exception.filter';
import { JwtGuard } from '../guards/jwt.guard';

export function Auth() {
  return applyDecorators(
    ApiExceptions(LoginRequiredException, AccessTokenExpiredException),
    UseGuards(JwtGuard),
    UseFilters(JwtExceptionFilter),
    ApiBearerAuth(),
  );
}
