import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@td/common/types';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto implements Partial<Todo> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: false
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @ApiProperty({
    required: false
  })
  @IsNumber()
  @IsOptional()
  order?: number;
}
