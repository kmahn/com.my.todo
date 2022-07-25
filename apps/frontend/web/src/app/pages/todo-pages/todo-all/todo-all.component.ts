import { Component, OnInit } from '@angular/core';
import { Todo, User } from '@td/common/types';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'td-todo-all',
  templateUrl: './todo-all.component.html',
  styleUrls: ['./todo-all.component.scss'],
})
export class TodoAllComponent implements OnInit {
  todos: Todo[] = [];

  constructor(public todoService: TodoService) {
  }


  ngOnInit(): void {
    this.todoService.findAll().subscribe(todos => this.todos = todos as Todo[]);
  }

  getUserName(todo: Todo) {
    return (todo.user as User).name;
  }
}