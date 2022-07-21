import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthBaseService } from '../../services/auth-base.service';

@Component({
  selector: 'td-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit, OnDestroy {
  signupFormGroup: FormGroup;
  submitted: boolean = false;

  private _subscription?: Subscription;

  constructor(private authService: AuthBaseService,
              private router: Router,
              fb: FormBuilder) {

    this.signupFormGroup = fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      confirmPassword: [null],
    }, {
      validators: [
        form => {
          const password = form.get('password')?.value;
          const confirmPassword = form.get('confirmPassword')?.value;
          return password === confirmPassword ? null : { confirmPassword: true };
        }
      ]
    });
  }

  submit() {
    this.submitted = true;

    if (this.signupFormGroup.invalid) {
      return;
    }

    const { email, name, password } = this.signupFormGroup.getRawValue();
    this.authService.join({ email, name }, password).subscribe({
      next: () => {
        alert('회원가입에 성공하셨습니다!');
        this.router.navigateByUrl('/login')
      },
      error: err => alert(err.error?.code || err.message)
    });
  }

  ngOnInit(): void {
    this._subscription = this.signupFormGroup.valueChanges.subscribe({
      next: () => this.submitted = false,
    });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }


}
