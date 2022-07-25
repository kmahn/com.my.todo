import { SetMetadata } from '@nestjs/common';
import { UserRoleType } from '@td/common/types';

export const Role = (...roles: UserRoleType[]) => SetMetadata('roles', roles);
