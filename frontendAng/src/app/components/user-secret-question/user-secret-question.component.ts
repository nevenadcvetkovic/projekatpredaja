import { Component, OnInit, Input, NgZone } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-secret-question',
  templateUrl: './user-secret-question.component.html',
  styleUrls: ['./user-secret-question.component.css']
})
export class UserSecretQuestionComponent implements OnInit {

  submitted = false;
  userSecretForm: FormGroup;
  user:User;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
    this.user=history.state.data
  }

  ngOnInit() { }

  mainForm() {
    this.userSecretForm = this.fb.group({
      secretAnswer: ['', [Validators.required]]
    });
  };


  // Getter to access form control
  get myForm(){
    return this.userSecretForm.controls;
  }

  onSecretSubmit() {
    this.submitted = true;
    if (!this.userSecretForm.valid) {
      return false;
    } else{
      if(this.userSecretForm.get('secretAnswer').value===this.user.secretAnswer){
      
          this.ngZone.run(() => this.router.navigateByUrl('/user-new-password', {state:{data:this.user.username}}))
      }else{
        this.ngZone.run(()=>this.router.navigateByUrl('/'));
      }
       
    }
  }


}
