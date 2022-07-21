import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, UserDocument } from '@td/backend/database';
import { Auth, LocalJoin, User } from '@td/common/types';
import { Model } from 'mongoose';
import { UserRepository } from '../user-repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {

  constructor(
    @InjectModel(AuthDocument.name) private authModel: Model<AuthDocument>,
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {
  }

  async create(dto: LocalJoin): Promise<void> {
    const { password } = dto;
    const user = { ...dto };
    delete user.password;


    const userDocument = await this.userModel.create(user);
    const authDocument = await this.authModel.create({
      providerId: userDocument._id.toHexString(),
      password,
      user: userDocument._id,
    });
    userDocument.auth = authDocument._id;
    await userDocument.save();
  }

  async findAuthById(id: string): Promise<Partial<Auth>> {
    return this.authModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<Partial<User>> {
    return this.userModel.findOne({ email }).lean();
  }

  async findOneById(id: string): Promise<Partial<User>> {
    return this.userModel.findById(id).lean();
  }
}
