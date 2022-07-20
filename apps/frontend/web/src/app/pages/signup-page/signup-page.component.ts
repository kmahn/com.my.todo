import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthBaseService} from "../../services/auth-base.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'td-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit, OnDestroy{
  signupFormGroup: FormGroup;
  submitted: boolean = false;

  private _subscription?: Subscription;

  constructor(private authService: AuthBaseService,
              private router:Router,
              fb: FormBuilder) {
    const emailPattern = /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/

    this.signupFormGroup = fb.group({
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      name: [null, [Validators.required]],
      password:[null, [Validators.required]]
    })
  }

  submit(){
    this.submitted = true;

    if(this.signupFormGroup.invalid){
      return;
    }

    const {email, name, password} = this.signupFormGroup.getRawValue();
    this.authService.join({email, name}, password).subscribe({
      next: () => {
        alert('회원가입에 성공하셨습니다!');
        this.router.navigateByUrl('/login')
      },
      error: err => alert(err.error?.code || err.message)
    })

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
