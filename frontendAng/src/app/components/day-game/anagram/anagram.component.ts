import { Component, OnInit, Input, NgZone, ViewChild } from '@angular/core';
import { Anagram } from 'src/app/model/anagram';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Subscription, timer } from 'rxjs';
import { Goblet } from 'src/app/model/goblet';
import { Table55 } from 'src/app/model/table55';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.css']
})
export class AnagramComponent implements OnInit {
  private goblet: Goblet;
  private table5x5: Table55;
  private dayGamePoints: DayGameUserPoints;
  private user:User;
  anagram: Anagram;
  anagramForm: FormGroup;
  submitted = false;
  timer: number;
  result = 0;
  points = 0;
  visibleT = false;
  visible = false;
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
    this.anagram = history.state.dataA;
    this.goblet = history.state.dataG;
    this.table5x5 = history.state.dateT;
    this.dayGamePoints = history.state.dataGame;
    this.timer = 60;
    const ti = timer(2000, 1000);
    this.myTimerSub = ti.subscribe(t => {
      if (this.timer != 0)
        this.timer -= 1;
      else if (!this.submitted) {
        this.visibleT = false;
        this.onSubmit();
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
    this.anagramForm = this.fb.group({
      answer: ['', [Validators.pattern('[a-zA-Z\\s]*$')]]
    });
  };


  // Getter to access form control
  get myForm() {
    return this.anagramForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.visibleT=false;
    if (!this.anagramForm.valid) {
      this.points = 0;
    } else {
      if (this.anagram.solution.toUpperCase() === this.anagramForm.get('answer').value.toUpperCase()) {
        this.dayGamePoints.points += 10;
        this.points = 10;
      } else {
        this.points = 0;
      }
      document.getElementById('answer').setAttribute('value', this.anagram.solution.toString());
      this.visible = true;


    }
  }
  nextGame(){
    this.ngZone.run(() => this.router.navigateByUrl('/my-number', { state: {user:this.user, dataG: this.goblet, dataT: this.table5x5, dataGame: this.dayGamePoints} }))
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
