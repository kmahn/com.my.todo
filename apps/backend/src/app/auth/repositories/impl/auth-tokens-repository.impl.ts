import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { LoginInfoDocument, UserDocument } from '@td/backend/database';
import { AuthTokens, UserProfile } from '@td/common/types';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { AuthTokensRepository } from '../auth-tokens-repository';
import { InvalidRefreshTokenException } from '../exceptions/invalid-refresh-token.exception';


@Injectable()
export class AuthTokensRepositoryImpl implements AuthTokensRepository {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(LoginInfoDocument.name) private loginInfoModel: Model<LoginInfoDocument>,
    private jwtService: JwtService
  ) {
  }

  async createAuthTokens(userProfile: UserProfile): Promise<AuthTokens> {
    const accessToken = this.jwtService.sign(userProfile);
    const refreshToken = v4();
    await this.loginInfoModel.create({ user: userProfile._id, refreshToken });
    return { accessToken, refreshToken };
  }

  async updateAuthTokens(oldRefreshToken: string, userProfile: UserProfile): Promise<AuthTokens> {
    const old = await this.loginInfoModel
      .findOneAndDelete({ refreshToken: oldRefreshToken })
      .lean();

    if (!old) {
      throw new InvalidRefreshTokenException();
    }

    const accessToken = this.jwtService.sign(userProfile);
    const refreshToken = v4();

    delete old.createdAt;
    const newLoginInfo = { ...old, refreshToken };
    await this.loginInfoModel.create(newLoginInfo);

    return { accessToken, refreshToken };
  }
}
