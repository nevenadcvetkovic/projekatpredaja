import { Component, OnInit, NgZone, Output } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { DayGame } from 'src/app/model/day-game';
import { Table55 } from 'src/app/model/table55';
import { Anagram } from 'src/app/model/anagram';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Goblet } from 'src/app/model/goblet';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-day-game',
  templateUrl: './day-game.component.html',
  styleUrls: ['./day-game.component.css']
})
export class DayGameComponent implements OnInit {
  dayGameForm: FormGroup;
  dayGameForm1: FormGroup;
  dayGame: DayGame;
  dayGamePoints: DayGameUserPoints;
  table5x5: Table55;
  date: Date;
  goblet: Goblet;
  anagram: Anagram;
  dayGameResult: DayGameUserPoints;
  user: User;
  message = '';
  disabledLink=false;

  constructor(public fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user = history.state.user;
    this.user = history.state.user;
    if (this.user == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    this.mainForm();
    this.isGamePlayed();


  }

  ngOnInit() {

  }
  mainForm() {
    this.date = new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    this.dayGameForm = this.fb.group({
      date: [this.date.toISOString()]
    });

    this.dayGameForm1 = this.fb.group({
      date: [this.date.toISOString()],
      username: [this.user.username]
    })

  };

  isGamePlayed() {
    this.apiService.getDayGamePoints(this.dayGameForm1.value).subscribe((data) => {
      this.dayGamePoints = data;
      if (data == null) {
        console.log('ccc')
        this.readDayGame();
        this.readRandom5x5();
      }else{
        console.log(data)
        this.message='You already played the day game!'
        this.disabledLink=true;
        console.log(this.message)
      }

    })

  }
  readDayGame() {
    this.apiService.getDayGame(this.dayGameForm.value).subscribe((data) => {
      this.dayGame = data;
      this.readAnagram();
      this.readGoblet();

    })

  }
  readRandom5x5() {
    this.apiService.getRTable55().subscribe(data => {
      this.table5x5 = data[0]
    })
  }
  readAnagram() {
    this.apiService.getAnagram(this.dayGame.anagram).subscribe(data => {
      this.anagram = data;
    })
  }

  readGoblet() {
    this.apiService.getGoblet(this.dayGame.goblet).subscribe(data => {
      this.goblet = data;
    })
  }
  startTheDayGame() {
    this.dayGameResult = new DayGameUserPoints();
    this.dayGameResult.date = this.date;
    this.dayGameResult.username = this.user.username;
    this.dayGameResult.points = 0;
    this.ngZone.run(() => this.router.navigateByUrl('/anagram', { state: {user:this.user, dataA: this.anagram, dataG: this.goblet, dataT: this.table5x5, dataGame: this.dayGameResult } }))

  }
  onLogout() {
    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }
  
  home(){
    this.ngZone.run(() => this.router.navigateByUrl('/user-home', { state: {user:this.user } }))

  }


}
