import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Todo } from '@td/common/types';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(
    public todoService: TodoService
  ) {}

  ngOnInit(): void {}

  updateOrder(event: CdkDragDrop<Todo, any>) {
    const todos = [...this.todoService.todos];
    moveItemInArray(todos, event.previousIndex, event.currentIndex);
    this.todoService.updateOrder(todos).subscribe({
      error: err => alert(err?.error?.code || err?.message)
    });
  }
}
