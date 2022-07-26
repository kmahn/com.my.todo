import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BackendConfigModule } from '@td/backend/config';
import { AuthService } from './application/auth.service';
import { Guards } from './guards';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthController } from './interface/auth.controller';
import { Repositories } from './repositories';
import { Strategies } from './strategies';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [BackendConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [
    ...Strategies,
    ...Repositories,
    ...Guards,
    AuthService
  ],
  exports: [
    JwtGuard,
    RolesGuard,
  ]
})
export class AuthModule {
}
