import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';

export const Guards = [
  JwtGuard,
  RolesGuard,
]
