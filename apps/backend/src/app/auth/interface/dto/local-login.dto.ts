import { ApiProperty } from '@nestjs/swagger';
import { LocalLogin } from '@td/common/types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalLoginDto implements LocalLogin {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
