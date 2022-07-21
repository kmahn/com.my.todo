import { Inject, Injectable } from '@nestjs/common';
import { AuthTokens } from '@td/common/types';
import { LocalJoinDto } from '../interface/dto/local-join.dto';
import { AuthTokensRepository } from '../repositories/auth-tokens-repository';
import { UserRepository } from '../repositories/user-repository';
import { EmailUsedException } from './exceptions/email-used.exception';
import { InvalidPasswordException } from './exceptions/invalid-password.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class AuthService {

  constructor(
    @Inject(AuthTokensRepository) private tokensRepository: AuthTokensRepository,
    @Inject(UserRepository) private userRepository: UserRepository,
  ) {
  }

  async join(dto: LocalJoinDto): Promise<void> {
    const { email } = dto;
    const exUser = await this.userRepository.findOneByEmail(email);

    if (exUser) {
      throw new EmailUsedException();
    }

    await this.userRepository.create(dto);
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    const exUser = await this.userRepository.findOneByEmail(email);
    if (!exUser) {
      throw new UserNotFoundException();
    }

    const exAuth = await this.userRepository.findAuthById(exUser.auth);

    if (!exAuth.validatePassword(password)) {
      throw new InvalidPasswordException();
    }

    return this.tokensRepository.createAuthTokens({
      _id: exUser._id,
      role: exUser.role
    });
  }
}
