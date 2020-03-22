import { Component, OnInit, NgZone } from '@angular/core';
import { Goblet } from 'src/app/model/goblet';
import { Table55 } from 'src/app/model/table55';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-goblet',
  templateUrl: './goblet.component.html',
  styleUrls: ['./goblet.component.css']
})
export class GobletComponent implements OnInit {

  goblet: Goblet;
  private table5x5: Table55;
  private dayGamePoints: DayGameUserPoints;
  private user: User;
  gobletForm: FormGroup;
  submitted = false;
  timer: number;
  points = 0;
  visibleT = false;
  visible = false;
  myNumber = 13;
  columnLabels = ['bAnswer7', 'bAnswer6', 'bAnswer5', 'bAnswer4', 'bAnswer3', 'bAnswer2', 'tAnswer1', 'tAnswer2', 'tAnswer3', 'tAnswer4', 'tAnswer5', 'tAnswer6', 'tAnswer7']
  areVisible = [false, false, false, false, false, false, false, false, false, false, false, false, true]
  columnIds = ['bAnswer7o', 'bAnswer6o', 'bAnswer5o', 'bAnswer4o', 'bAnswer3o', 'bAnswer2o', 'tAnswer1o', 'tAnswer2o', 'tAnswer3o', 'tAnswer4o', 'tAnswer5o', 'tAnswer6o', 'tAnswer7o']
  clicked = false;
  answers = ['', '', '', '', '', '', '', '', '', '', '', '', '']
  first = true;
  condition = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.user = history.state.user;
    if (this.user == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    this.mainForm();
    this.goblet = history.state.dataG;
    this.table5x5 = history.state.dateT;
    this.dayGamePoints = history.state.dataGame;
    this.points = this.dayGamePoints.points
    this.timer = 30;
    const ti = timer(2000, 1000);
    this.myTimerSub = ti.subscribe(t => {
      if (this.timer != 0)
        this.timer -= 1;
      else if (this.myNumber > 0 && !this.clicked) {
        this.onClick(this.myNumber);
      }
    });
    this.visibleT = true;
  }
  private myTimerSub: Subscription;

  ngOnDestroy() {
    this.myTimerSub.unsubscribe();
  }

  ngOnInit() { }

  mainForm() {
    this.gobletForm = this.fb.group({
      tAnswer7: ['', [Validators.pattern('[a-zA-Z]*$')]],
      tAnswer6: ['', [Validators.pattern('[a-zA-Z]*$')]],
      tAnswer5: ['', [Validators.pattern('[a-zA-Z]*$')]],
      tAnswer4: ['', [Validators.pattern('[a-zA-Z]*$')]],
      tAnswer3: ['', [Validators.pattern('[a-zA-Z]*$')]],
      tAnswer2: ['', [Validators.pattern('[a-zA-Z]*$')]],
      tAnswer1: ['', [Validators.pattern('[a-zA-Z]*$')]],
      bAnswer2: ['', [Validators.pattern('[a-zA-Z]*$')]],
      bAnswer3: ['', [Validators.pattern('[a-zA-Z]*$')]],
      bAnswer4: ['', [Validators.pattern('[a-zA-Z]*$')]],
      bAnswer5: ['', [Validators.pattern('[a-zA-Z]*$')]],
      bAnswer6: ['', [Validators.pattern('[a-zA-Z]*$')]],
      bAnswer7: ['', [Validators.pattern('[a-zA-Z]*$')]]

    });
  };


  // Getter to access form control
  get myForm() {
    return this.gobletForm.controls;
  }


  onClick(number) {
    this.clicked = true;
    this.myNumber = number;
    this.myNumber--;
    this.visibleT = false;
    var value = this.getGobletParamByNumber(number).toUpperCase();
    var formField = this.gobletForm.get(this.columnLabels[number - 1]).value.toUpperCase();
    if (formField === value) {
      //get class change to success
      this.points += 5;
      this.condition[number - 1] = 3;
      // document.getElementById(this.columnLabels[number-1]).className="col-md-12 bg-success"
    } else if (formField === "") {
      //get class change to not tryed
      //document.getElementById(this.columnLabels[number-1]).className="col-md-12 bg-warning"
      this.condition[number - 1] = 1;
    } else {
      this.condition[number - 1] = 2
      //document.getElementById(this.columnIds[number-1]).className="col-md-12 bg-danger"
      //get class change to fail
    }
    this.answers[this.myNumber] = value;
    this.areVisible[this.myNumber] = false;
    this.areVisible[this.myNumber - 1] = true;
    this.timer = 30;
    this.visibleT = true;
    this.clicked = false;
    if (this.myNumber == 0)
      this.visible = true
  }

  getGobletParamByNumber(number): String {
    switch (number) {
      case 13:
        return this.goblet.tAnswer7;
      case 12:
        return this.goblet.tAnswer6;
      case 11:
        return this.goblet.tAnswer5;
      case 10:
        return this.goblet.tAnswer4;
      case 9:
        return this.goblet.tAnswer3;
      case 8:
        return this.goblet.tAnswer2;
      case 7:
        return this.goblet.tAnswer1;
      case 6:
        return this.goblet.bAnswer2;
      case 5:
        return this.goblet.bAnswer3;
      case 4:
        return this.goblet.bAnswer4;
      case 3:
        return this.goblet.bAnswer5;
      case 2:
        return this.goblet.bAnswer6
      case 1:
        return this.goblet.bAnswer7

    }

  }

  onSubmit() {

  }


  nextGame() {
    this.dayGamePoints.points = this.points;
    this.ngZone.run(() => this.router.navigateByUrl('/table55', { state: { user: this.user, dataT: this.table5x5, dataGame: this.dayGamePoints } }))
  }
  onLogout() {
    if (confirm('Are you sure you want to logout? You won\'t be able to finish the game!')) {
      this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
        (res) => {  
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, (error) => {
          console.log(error);
        });
      //save daygamepoints to db

    }
  }
  home() {
    if (confirm('Are you sure you want to leave? You won\'t be able to finish the game!')) {
      this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
        (res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/user-home', { state: { user: this.user } }))
        }, (error) => {
          console.log(error);
        });
    }
  }
}
