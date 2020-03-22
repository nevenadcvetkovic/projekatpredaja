import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-new-password',
  templateUrl: './user-new-password.component.html',
  styleUrls: ['./user-new-password.component.css']
})
export class UserNewPasswordComponent implements OnInit {

  submitted = false;
  passwordChangeNew: FormGroup;
  message: String;
  username: String;
  show = false;
  value: String;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
    this.username = history.state.data;

  }

  ngOnInit() { }

  mainForm() {
    this.passwordChangeNew = this.fb.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    }, { validator: this.passwordConfirming })
  };

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordRepeat').value) {
      return { invalid: true };
    }

  }

  get myForm() {
    return this.passwordChangeNew.controls;
  }

  onChangeSubmit() {
    this.submitted = true;
    if (!this.passwordChangeNew.valid) {
      return false;
    } else {
      this.apiService.updatePassword(this.username, this.passwordChangeNew.value).subscribe(
        (data: User) => {
          console.log('Password successfully changed!')
          this.ngZone.run(() => this.router.navigateByUrl('/user-login'));
      });  
    }
  }
}
