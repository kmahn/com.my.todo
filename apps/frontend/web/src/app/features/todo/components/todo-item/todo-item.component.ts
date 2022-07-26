import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '@td/common/types';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: Todo;
  @ViewChild('input') inputRef?: ElementRef;

  formGroup: FormGroup;

  private _editMode: boolean = false;

  constructor(
    private todoService: TodoService,
    fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      title: [null, [Validators.required]]
    });
  }

  set editMode(on: boolean) {
    this._editMode = on;
    if (on && this.inputRef) {
      (this.inputRef.nativeElement as HTMLInputElement).focus();
    }
  }

  get editMode(): boolean {
    return this._editMode;
  }

  cancel(event: MouseEvent) {
    event.stopPropagation();
    this.formGroup.get('title')?.setValue(this.todo?.title);
    this.editMode = false;
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }

    const todo = this.formGroup.getRawValue();
    this.todoService.updateOne(this.todo?._id!, todo).subscribe({
      next: () => this.editMode = false,
      error: err => alert(err?.error?.code || err?.message)
    });
  }

  ngOnInit(): void {
    this.formGroup.get('title')?.setValue(this.todo?.title);
  }

  remove(event: MouseEvent) {
    event.stopPropagation();
    const yes = confirm('삭제할래?');
    if (!yes) {
      return;
    }

    this.todoService.removeOne(this.todo?._id!).subscribe({
      error: err => alert(err?.error?.code || err?.message)
    });
  }

  toggleDone(done: any) {
    this.todoService.updateOne(this.todo?._id!, { done }).subscribe({
      error: err => alert(err?.error?.code || err?.message)
    });
  }
}
