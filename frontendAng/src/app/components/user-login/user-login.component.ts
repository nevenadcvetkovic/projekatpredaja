import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  submitted = false;
  userLoginForm: FormGroup;

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
    this.userLoginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  };


  // Getter to access form control
  get myForm(){
    return this.userLoginForm.controls;
  }

  onLoginSubmit() {
    this.submitted = true;
    if (!this.userLoginForm.valid) {
      console.log('cao');
      return false;
    } else{
      this.apiService.getUserByUsernamePass(this.userLoginForm.value).subscribe(
        (data:User) => {
          if(data!=null){
          switch(data.userType){
            case 0:{//user
              if(data.isApproved){
              this.ngZone.run(() => this.router.navigateByUrl('/user-home',{ state: { user: data} }));
              break;
            }else
              alert('Your request hasn\'t been approved yet!');
              break;

            }
            case 1:{//admin
              //this.apiService.setToken(data['token']);
              this.ngZone.run(() => this.router.navigateByUrl('/admin', { state: { admin: data} }));
              break;

            }
            case 2:{//supervizor
             // this.apiService.setToken(data['token']);
              this.ngZone.run(() => this.router.navigateByUrl('/supervizor', { state: { supervizor: data} }));
              break;

            }
          }
        }

        }, (error) => {
          console.log(error);
        });
    }
  }

}
