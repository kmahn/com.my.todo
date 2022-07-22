import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ForbiddenException } from '@td/backend/exception';
import { ApiExceptions } from '@td/backend/util';
import { UserRoleType } from '@td/common/types';
import { LoginRequiredException } from '../../exceptions/login-required.exception';
import { RolesGuard } from '../../guards/roles.guard';

export function Roles(...roles: UserRoleType[]) {
  return applyDecorators(
    ApiExceptions(ForbiddenException, LoginRequiredException),
    UseGuards(RolesGuard),
    SetMetadata('roles', roles),
  );
}
