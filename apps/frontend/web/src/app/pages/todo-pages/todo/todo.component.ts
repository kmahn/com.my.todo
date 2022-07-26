import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Todo, User } from '@td/common/types';
import { BehaviorSubject } from 'rxjs';
import { AuthBaseService } from '../../../services/auth-base.service';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'td-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todos: Todo[] = [];
  @Output() updateEvent = new EventEmitter<void>();
  editMode: boolean = false;
  editTodo: Todo | null = null;
  createTodoTitle: string | null = null;

  readonly isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    public authService: AuthBaseService,
    private todoService: TodoService,
    public router: Router,
  ) {
  }

  getUserName(todo: Todo) {
    return (todo.user as User).name;
  }

  getDone(todo: Todo) {
    return { done: todo.done };
  }

  changeDone(todo: Todo): void {
    todo.done = !(todo.done);
    this.todoService.updateOne(todo);
  }

  changeEditMode(todo: Todo | null): void {
    if (todo) {
      this.editTodo = { ...todo };
    }
    else {
      this.editTodo = null;
    }

    this.editMode = !this.editMode;
  }

  ngOnInit(): void {
    this.editTodo = null;
  }

  createTodo(title: string) {
    this.todoService.create(title);
  }

  updateTodo(editTodo: Todo) {
    this.todoService.updateOne(editTodo);
    this.updateEvent.emit(undefined);
    this.changeEditMode(null);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteOne(todo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  getUserId(todo: Todo): string {
    return (todo.user as User)._id;
  }

  getEdit(todo: Todo) {
    return this.editTodo?._id === todo._id ? { edit: true } : { edit: false };
  }
}
