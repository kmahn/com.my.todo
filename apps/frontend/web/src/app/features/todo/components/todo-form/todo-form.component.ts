import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'td-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private todoService: TodoService,
    fb: FormBuilder
  ) {
    this.formGroup = fb.group({
      title: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    const todo = this.formGroup.getRawValue();
    this.todoService.create(todo).subscribe({
      next: () => this.formGroup.reset(),
      error: err => alert(err?.error?.code || err?.message),
    });
  }
}
