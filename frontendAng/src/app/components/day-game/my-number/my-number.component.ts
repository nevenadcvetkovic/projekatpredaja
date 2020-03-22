import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Subscription, timer } from 'rxjs';
import { Goblet } from 'src/app/model/goblet';
import { Table55 } from 'src/app/model/table55';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-my-number',
  templateUrl: './my-number.component.html',
  styleUrls: ['./my-number.component.css']
})
export class MyNumberComponent implements OnInit {
  private goblet: Goblet;
  private table5x5: Table55;
  private dayGamePoints: DayGameUserPoints;
  private user:User;
  oneDigitNumbers: number[] = [];
  twoDigitNumbersArray = [10, 15, 20]
  twoOrThreeDigitNumbers = [25, 50, 75, 100]
  twoDigitDisplay: number;
  twoOrThreeDigitDisplay: number;
  searchNumber: number;
  visible = true;
  visibleN=false;
  submitted = false;
  myNumberForm: FormGroup;
  timer: number;
  result = 0;
  points = 0;
  visibleT = false;
  visibleR = false;
  message = '';

  private myTimerSub: Subscription;

  ngOnDestroy() {
    this.myTimerSub.unsubscribe();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.user = history.state.user;
    if (this.user == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    this.timer = 60;
    this.mainForm();
    this.goblet = history.state.dataG;
    this.table5x5 = history.state.dateT;
    this.dayGamePoints = history.state.dataGame;
    this.points = this.dayGamePoints.points;
  }

  ngOnInit() { }

  mainForm() {
    this.myNumberForm = this.fb.group({
      solution: ['', [Validators.pattern('[0-9\\+\\-\\/\\*\\(\\)]*$')]]
    });
  };


  // Getter to access form control
  get myForm() {
    return this.myNumberForm.controls;
  }

  getRandom(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  myVar = setInterval(() => {
    var min = 1;
    var max = 9;
    this.oneDigitNumbers[0] = this.getRandom(min, max);
    this.oneDigitNumbers[1] = this.getRandom(min, max);
    this.oneDigitNumbers[2] = this.getRandom(min, max);
    this.oneDigitNumbers[3] = this.getRandom(min, max);
    min = 0;
    max = 2;
    this.twoDigitDisplay = this.twoDigitNumbersArray[this.getRandom(min, max)];
    max = 3;
    this.twoOrThreeDigitDisplay = this.twoOrThreeDigitNumbers[this.getRandom(min, max)];
    min = 1;
    max = 999;
    this.searchNumber = this.getRandom(min, max);
  }, 200);

  clearMyInterval() {
    clearInterval(this.myVar);
    const ti = timer(2000, 1000);
    this.visible=false;
    this.visibleT = true;
    this.myTimerSub = ti.subscribe(t => {
      if (this.timer != 0)
        this.timer -= 1;
      else if (!this.submitted) {
        this.visible = true;
        this.visibleT = true;
        this.onSubmit();
      }
    });


  }

  onSubmit() {
    this.submitted = true;
    this.visibleT = false;
    this.visibleN=true;
    if (!this.myNumberForm.valid) {
      this.result = 0;
    } else {
      try {
        this.result = eval(this.myNumberForm.get('solution').value);
        this.visibleR = true;
        if (this.result == this.searchNumber) {
          var solutionArgs = this.myNumberForm.get('solution').value.split(/[\+\-\*\/\(\)]/);
          var flag = false;
          solutionArgs.forEach(element => {
            if (element === "") {
              console.log(element)
            } else {
              var number = parseInt(element, 10);
              if (number != this.oneDigitNumbers[0] && number != this.oneDigitNumbers[1] && number != this.oneDigitNumbers[2]
                && number != this.oneDigitNumbers[3] && number != this.twoDigitDisplay && number != this.twoOrThreeDigitDisplay) {
                flag = true;
              }
            }
          });
          if (!flag) {
            this.points += 10;
            this.dayGamePoints.points += 10;
          } else {
            this.message = 'You used a number that wasn\'t given!'
          }
        }
        this.visibleN = true;

      } catch (e) {
        if (e instanceof SyntaxError) {
          this.result = 0;

        }
        console.log(e)
      }
    }
  }
  nextGame() { 
    this.ngZone.run(() => this.router.navigateByUrl('/interesting-geography', { state: {user:this.user, dataG: this.goblet, dataT: this.table5x5, dataGame: this.dayGamePoints } }))
  }
  onLogout() {
    if(confirm('Are you sure you want to logout? You won\'t be able to finish the game!')){
    this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
      (res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      }, (error) => {
        console.log(error);
      });
    //save daygamepoints to db

  }
  }
home(){
  if(confirm('Are you sure you want to leave? You won\'t be able to finish the game!')){
    this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
      (res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/user-home', { state: {user:this.user } }))
      }, (error) => {
        console.log(error);
      });
}
}
}