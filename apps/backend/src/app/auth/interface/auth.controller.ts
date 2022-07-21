import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiExceptions } from '@td/backend/util';
import { AuthService } from '../application/auth.service';
import { EmailUsedException } from '../application/exceptions/email-used.exception';
import { InvalidPasswordException } from '../application/exceptions/invalid-password.exception';
import { UserNotFoundException } from '../application/exceptions/user-not-found.exception';
import { LocalJoinDto } from './dto/local-join.dto';
import { LocalLoginDto } from './dto/local-login.dto';

@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @ApiExceptions(
    EmailUsedException
  )
  @Post('join')
  join(@Body() dto: LocalJoinDto) {
    return this.authService.join(dto);
  }

  @ApiExceptions(
    UserNotFoundException,
    InvalidPasswordException
  )
  @Post('login')
  login(@Body() dto: LocalLoginDto) {
    const { email, password } = dto;
    return this.authService.login(email, password);
  }
}
