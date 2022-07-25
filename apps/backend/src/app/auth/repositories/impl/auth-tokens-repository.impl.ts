import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { LoginInfoDocument, UserDocument } from '@td/backend/database';
import { AuthTokens, UserProfile } from '@td/common/types';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { AuthTokensRepository } from '../auth-tokens-repository';
import {
  InvalidRefreshTokenException,
} from '../exceptions/invalid-refresh-token.exception';

@Injectable()
export class AuthTokensRepositoryImpl implements AuthTokensRepository {
  constructor(
    private jwtService: JwtService,
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
    @InjectModel(LoginInfoDocument.name) private loginInfoModel: Model<LoginInfoDocument>,
  ) {
  }

  async createAuthTokens(userProfile: UserProfile): Promise<AuthTokens> {
    const accessToken = this.jwtService.sign(userProfile);
    const refreshToken = v4();
    await this.loginInfoModel.create({ user: userProfile._id, refreshToken });
    return { accessToken, refreshToken } as AuthTokens;
  }

  async updateAuthTokens(oldRefreshToken: string): Promise<AuthTokens> {
    const old = await this.loginInfoModel.findOneAndDelete({ refreshToken: oldRefreshToken }).lean();
    if (!old) {
      throw new InvalidRefreshTokenException();
    }

    const { _id, role } = await this.userModel.findById(old.user).lean();
    const userProfile = { _id, role };

    const accessToken = this.jwtService.sign(userProfile);
    const refreshToken = v4();

    delete old.createdAt;
    const newLoginInfo = { ...old, refreshToken };
    await this.loginInfoModel.create(newLoginInfo);

    return { accessToken, refreshToken } as AuthTokens;
  }

  async remove(refreshToken: string): Promise<void> {
    await this.loginInfoModel.findOneAndDelete({ refreshToken });
  }
}
