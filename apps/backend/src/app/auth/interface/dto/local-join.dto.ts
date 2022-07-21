import { ApiProperty } from '@nestjs/swagger';
import { LocalJoin } from '@td/common/types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LocalJoinDto implements LocalJoin {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
