import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForbiddenException } from '@td/backend/exception';
import { ApiExceptions, User } from '@td/backend/util';
import { Todo, UserProfile } from '@td/common/types';
import { Auth } from '../../auth/interface/decorators/auth.decorator';
import { Roles } from '../../auth/interface/decorators/roles.decorator';
import { TodoService } from '../application/todo.service';
import { TodoNotFoundException } from '../repositories/exceptions/todo-not-found.exception';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiBearerAuth()
@ApiTags('Todo APIs')
@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
  ) {
  }

  @Get()
  @Roles('admin')
  @Auth()
  findAll(): Promise<Partial<Todo>[]> {
    return this.todoService.findAll();
  }

  @ApiExceptions(ForbiddenException)
  @Get('me')
  @Auth()
  findMyTodos(@User() user: UserProfile): Promise<Partial<Todo>[]> {
    return this.todoService.findMyTodos(user._id);
  }

  @ApiExceptions(ForbiddenException, TodoNotFoundException)
  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string, @User() user: UserProfile) {
    return this.todoService.findOne(id, user);
  }

  @Post()
  @Auth()
  create(@Body() dto: CreateTodoDto, @User() user: UserProfile): Promise<void> {
    return this.todoService.create(dto, user);
  }

  @Put(':id')
  @Auth()
  updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
    @User() user: UserProfile
  ) {
    return this.todoService.updateOne(id, dto, user);
  }

  @Delete(':id')
  @Auth()
  deleteOne(
    @Param('id') id: string,
    @User() user: UserProfile
  ) {
    return this.todoService.deleteOne(id, user);
  }
}
