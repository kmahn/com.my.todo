import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BackendConfigModule } from '@td/backend/config';
import { AuthController } from './interface/auth.controller';
import { Repositories } from './repositories';
import { AuthService } from './application/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [BackendConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: '1d'},
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [...Repositories, AuthService],
})
export class AuthModule {
}
