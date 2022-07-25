import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@td/common/types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto implements Partial<Todo> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
