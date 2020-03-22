import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  submitted = false;
  userForm: FormGroup;
  UserTypes:any = ['Takmicar', 'Administrator', 'Supervizor']
  
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
    this.userForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      vocation: ['', [Validators.required]],
      userType:[0],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      JMBG: ['', [Validators.required, Validators.pattern('[0-9]{13}$')]],
      secretQuestion: ['', [Validators.required]],
      secretAnswer: ['', [Validators.required]],
      isApproved:[false]
    }, {validator: this.passwordConfirming})
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordRepeat').value) {
      console.log('cao2');
  
      return {invalid: true};
    }
}


  // Getter to access form control
  get myForm(){
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      console.log('cao');

      return false;
    } else{
      this.apiService.createUser(this.userForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/user-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
