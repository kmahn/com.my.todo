import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@td/common/types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto implements Partial<Todo> {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
