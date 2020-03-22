import { Component, OnInit, NgZone, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-forget-password',
  templateUrl: './user-forget-password.component.html',
  styleUrls: ['./user-forget-password.component.css']
})
export class UserForgetPasswordComponent implements OnInit {

  submitted = false;
  userForgetForm: FormGroup;
  myUser:User;

 constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
    this.myUser=new User();
  }

  ngOnInit() { }

  mainForm() {
    this.userForgetForm = this.fb.group({
      username: ['', [Validators.required]],
      JMBG: ['', [Validators.required, Validators.pattern('[0-9]{13}$')]]
    });
  };


  // Getter to access form control
  get myForm(){
    return this.userForgetForm.controls;
  }

  onForgetSubmit() {
    this.submitted = true;
    if (!this.userForgetForm.valid) {
      return false;
    } else{
      this.apiService.getUserByUsernamePass(this.userForgetForm.value).subscribe(
        (data:User) => {
          this.myUser.name=data.name;
          this.myUser.surname=data.name;
          this.myUser.username=data.username;
          this.myUser.secretQuestion=data.secretQuestion;
          this.myUser.secretAnswer=data.secretAnswer;
          this.ngZone.run(() => this.router.navigateByUrl('/user-secret-question', {state:{data:this.myUser}}))
         
        }, (error) => {
          console.log(error);
        });
    }
  }

}
