import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [TodoFormComponent, TodoListComponent, TodoItemComponent],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, FormsModule],
  exports: [TodoFormComponent, TodoListComponent, TodoItemComponent],
  providers: [TodoService]
})
export class TodoModule {}
