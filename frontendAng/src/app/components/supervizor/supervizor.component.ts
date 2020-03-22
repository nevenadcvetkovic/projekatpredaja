import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-supervizor',
  templateUrl: './supervizor.component.html',
  styleUrls: ['./supervizor.component.css']
})
export class SupervizorComponent implements OnInit {

  private supervizor:User;
  submittedA = false;
  submittedB = false;
  submittedG = false;
  supervizorAnagramForm: FormGroup;
  supervizorTable55Form: FormGroup;
  supervizorGobletForm: FormGroup;
  message: String;
  visibleA = false;
  visibleT = false;
  visibleG = false;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.supervizor = history.state.supervizor;
    if (this.supervizor == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
  
    this.mainForm();
    this.message = '';
  }

  ngOnInit() { }

  mainForm() {
    this.supervizorAnagramForm = this.fb.group({
      puzzle: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]+$')]],
      solution: ['', [Validators.required, Validators.pattern('[a-zA-Z\\s]+$')]]
    });
    this.supervizorTable55Form = this.fb.group({
      hc1: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]],
      hc2: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]],
      hc3: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]],
      hc4: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]],
      hc5: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]]
    });
    this.supervizorGobletForm = this.fb.group({
      tQuestion7: ['', [Validators.required]],
      tAnswer7: ['', [Validators.required, Validators.pattern('[a-zA-Z]{9,15}$')]],
      tQuestion6: ['', [Validators.required]],
      tAnswer6: ['', [Validators.required, Validators.pattern('[a-zA-Z]{8,12}$')]],
      tQuestion5: ['', [Validators.required]],
      tAnswer5: ['', [Validators.required, Validators.pattern('[a-zA-Z]{7,10}$')]],
      tQuestion4: ['', [Validators.required]],
      tAnswer4: ['', [Validators.required, Validators.pattern('[a-zA-Z]{6,9}$')]],
      tQuestion3: ['', [Validators.required]],
      tAnswer3: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]],
      tQuestion2: ['', [Validators.required]],
      tAnswer2: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,6}$')]],
      tQuestion1: ['', [Validators.required]],
      tAnswer1: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,5}$')]],
      bQuestion2: ['', [Validators.required]],
      bAnswer2: ['', [Validators.required, Validators.pattern('[a-zA-Z]{4,6}$')]],
      bQuestion3: ['', [Validators.required]],
      bAnswer3: ['', [Validators.required, Validators.pattern('[a-zA-Z]{5,8}$')]],
      bQuestion4: ['', [Validators.required]],
      bAnswer4: ['', [Validators.required, Validators.pattern('[a-zA-Z]{6,9}$')]],
      bQuestion5: ['', [Validators.required]],
      bAnswer5: ['', [Validators.required, Validators.pattern('[a-zA-Z]{7,10}$')]],
      bQuestion6: ['', [Validators.required]],
      bAnswer6: ['', [Validators.required, Validators.pattern('[a-zA-Z]{8,12}$')]],
      bQuestion7: ['', [Validators.required]],
      bAnswer7: ['', [Validators.required, Validators.pattern('[a-zA-Z]{9,15}$')]]
    })
  };


  // Getter to access form control
  get myForm() {
    return this.supervizorAnagramForm.controls;
  }
  get myFormT() {
    return this.supervizorTable55Form.controls;
  }

  get myFormG(){
    return this.supervizorGobletForm.controls;
  }

  onAnagramSubmit() {
    this.submittedA = true;
    if (!this.supervizorAnagramForm.valid) {
      return false;
    } else {
      this.apiService.insertAnagram(this.supervizorAnagramForm.value).subscribe(
        (res) => {
          this.message = 'Anagram successfully created!';
          this.visibleA = true;
          this.ngZone.run(() => this.router.navigateByUrl('/supervizor'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  onTable55Submit() {
    this.submittedB = true;
    if (!this.supervizorTable55Form.valid) {
      return false;
    } else {
      this.apiService.insertTable55(this.supervizorTable55Form.value).subscribe(
        (res) => {
          this.message = 'Table 5x5 successfully created!';
          this.visibleT = true;
          this.ngZone.run(() => this.router.navigateByUrl('/supervizor'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  onGobletSubmit(){
    this.submittedG = true;
    if (!this.supervizorGobletForm.valid) {
      return false;
    } else {
      this.apiService.insertGoblet(this.supervizorGobletForm.value).subscribe(
        (res) => {
          this.message = 'Goblet successfully created!';
          this.visibleT = true;
          this.ngZone.run(() => this.router.navigateByUrl('/supervizor'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  onLogout() {
    //this.apiService.deleteToken('');
    this.ngZone.run(() => this.router.navigateByUrl('/'))

  }

  validateG(){
    this.ngZone.run(() => this.router.navigateByUrl('/supervize-geography', { state: {supervizor: this.supervizor} }));
  }
}