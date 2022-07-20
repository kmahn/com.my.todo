import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthBaseService} from "../../services/auth-base.service";
import {Router} from "@angular/router";
import {ErrorCode} from "@td/common/error";

@Component({
  selector: 'td-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
})
export class JoinPageComponent implements OnInit {

  @ViewChild('password') passwordInputElement!: ElementRef<HTMLInputElement>

  joinFormGroup: FormGroup;

  constructor(private authService: AuthBaseService,
              private fb: FormBuilder,
              private router: Router) {
    const emailPattern = /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/;
    const passwordPattern = /(?=.*\d)(?=.*[a-z]).{8,}/;
    this.joinFormGroup = fb.group({
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      password: [null, [Validators.required, Validators.pattern(passwordPattern)]],
      name: [null, [Validators.required]],
      reconfirmPassword: [null, [Validators.required]]
    });
  }

  join() {
    if (this.joinFormGroup.invalid) {
      return;
    }

    const {email, password, name, reconfirmPassword } = this.joinFormGroup.getRawValue();
    if(reconfirmPassword !== password) {
      alert(ErrorCode.PASSWORD_NOT_MATCHED);
      this.passwordInputElement.nativeElement.focus();
      return;
    }
    this.authService.join({email, name}, password).subscribe({
      next: () => {alert("회원가입이 되었습니다.");
        this.router.navigateByUrl('/login')
      },
      error: err => alert(err.error?.code || err.message),
    });
  }

  ngOnInit(): void {
  }
}
