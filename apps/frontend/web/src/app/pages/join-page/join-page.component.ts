import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthBaseService } from '../../services/auth-base.service';

@Component({
  selector: 'td-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
})
export class JoinPageComponent implements OnInit, OnDestroy {
  joinFormGroup: FormGroup;
  submitted = false;

  private _subscription?: Subscription;

  constructor(
    private authService: AuthBaseService,
    private router: Router,
    fb: FormBuilder,
  ) {
    this.joinFormGroup = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      name: [null, [Validators.required]],
      confirmPassword: [null],
    }, {
      validators: [
        form => {
          const password = form.get('password')?.value;
          const confirmPassword = form.get('confirmPassword')?.value;
          return password === confirmPassword ? null : { confirmPassword: true };
        },
      ],
    });
  }

  submit() {
    this.submitted = true;

    if (this.joinFormGroup.invalid) {
      return;
    }

    const { email, password, name } = this.joinFormGroup.getRawValue();
    this.authService.join({ email, password, name }).subscribe({
      next: () => this.router.navigateByUrl('/main'),
      error: err => alert(err.error?.code || err.message),
    });
  }

  ngOnInit(): void {
    this._subscription = this.joinFormGroup.valueChanges.subscribe({
      next: () => this.submitted = false,
    });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
