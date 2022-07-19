import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthBaseService } from '../../services/auth-base.service';

@Component({
  selector: 'td-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup;
  submitted: boolean = false;

  private _subscription?: Subscription;

  constructor(private authService: AuthBaseService,
              private router: Router,
              fb: FormBuilder) {
    const emailPatter = /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/
    this.loginFormGroup = fb.group({
      email: [null, [Validators.required, Validators.pattern(emailPatter)]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    const { email, password } = this.loginFormGroup.getRawValue();
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/main'),
      error: err => alert(err.error?.code || err.message),
    });
  }

  ngOnInit(): void {
    this._subscription = this.loginFormGroup.valueChanges.subscribe({
      next: () => this.submitted = false,
    });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
