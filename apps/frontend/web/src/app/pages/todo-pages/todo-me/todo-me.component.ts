import { Component, OnInit } from '@angular/core';
import { Todo } from '@td/common/types';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'td-todo-me',
  templateUrl: './todo-me.component.html',
  styleUrls: ['./todo-me.component.scss'],
})
export class TodoMeComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
  ) {
  }

  ngOnInit(): void {
    this.findMe();
  }

  findMe() {
    this.todoService.findMe().subscribe(todos => this.todos = todos as Todo[]);
  }
}
