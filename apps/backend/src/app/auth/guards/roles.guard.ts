import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@td/backend/exception';
import { UserRoleType } from '@td/common/types';
import { Observable } from 'rxjs';
import { LoginRequiredException } from '../exceptions/login-required.exception';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRoleType[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request: any = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new LoginRequiredException();
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
