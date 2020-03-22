import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  submitted = false;
  passwordChange: FormGroup;
  passwordChangeNew: FormGroup;
  message: String;
  show = false;
  value: String;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();

  }

  ngOnInit() { }

  mainForm() {
    this.passwordChange = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
     }); 
     this.passwordChangeNew=this.fb.group({
       password: ['', Validators.required],
       passwordRepeat: ['', Validators.required]
    }, { validator: this.passwordConfirming })
  };

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordRepeat').value) {
      return { invalid: true };
    }

  }
  // Getter to access form control
  get myForm() {
    return this.passwordChange.controls;
  }
  get myFormNew(){
    return this.passwordChangeNew.controls;
  }

  onChangeSubmit() {
    this.submitted = true;
    if (!this.passwordChange.valid || !this.passwordChangeNew.valid) {
      return false;
    } else {
      console.log(this.passwordChange.value);
      this.apiService.getUserByUsernamePass(this.passwordChange.value).subscribe(
        (data: User) => {
          if (data == null) {
            this.message = "The user with that username, password doesn't exist!";
            this.show = true;
          } else {
            console.log(data.name);
            this.apiService.updatePassword(data.username, this.passwordChangeNew.value).subscribe(
              (data: User) => {
                console.log('Password successfully changed!')
          this.ngZone.run(() => this.router.navigateByUrl('/user-login'))
              }
            );

          }

        }, (error) => {
          console.log(error);
        });
    }
  }

}
