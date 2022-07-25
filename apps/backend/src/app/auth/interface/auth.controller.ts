import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiExceptions, User } from '@td/backend/util';
import { AuthTokens, User as IUser, UserProfile } from '@td/common/types';
import { AuthService } from '../application/auth.service';
import {
  EmailUsedException,
} from '../application/exceptions/email-used.exception';
import {
  InvalidPasswordException,
} from '../application/exceptions/invalid-password.exception';
import {
  UserNotFoundException,
} from '../application/exceptions/user-not-found.exception';
import { Auth } from '../decorators/auth.decorator';
import { LocalJoinDto } from './dto/local-join.dto';
import { LocalLoginDto } from './dto/local-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @ApiExceptions(
    EmailUsedException,
  )
  @Post('join')
  join(@Body() dto: LocalJoinDto): Promise<void> {
    return this.authService.join(dto);
  }

  @ApiExceptions(
    UserNotFoundException,
    InvalidPasswordException,
  )
  @Post('login')
  login(@Body() dto: LocalLoginDto): Promise<AuthTokens> {
    const { email, password } = dto;
    return this.authService.login(email, password);
  }

  @Get('todo-me')
  @Auth()
  getMe(@User() user: UserProfile): Promise<Partial<IUser>> {
    return this.authService.getMe(user._id);
  }

  @Get('token/refresh')
  refreshToken(@Headers('x-refresh-token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('logout')
  logout(@Headers('x-refresh-token') refreshToken: string): Promise<void> {
    return this.authService.logout(refreshToken);
  }
}
