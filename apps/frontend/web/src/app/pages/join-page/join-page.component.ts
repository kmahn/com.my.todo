import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthBaseService } from '../../services/auth-base.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

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
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
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
