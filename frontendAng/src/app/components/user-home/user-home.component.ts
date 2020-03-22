import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  private user: User;
  date: Date;
  last20: any[];
  mydayGamePoints: DayGameUserPoints;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) {


  }

  ngOnInit() {
    this.user = history.state.user;
    if (this.user == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    this.getDayGamePointsBest20();
  }

  getDayGamePointsBest20() {
    this.date = new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    var data = JSON.stringify({ date: { $eq: this.date } });
    this.apiService.getDayGamePointsDateCondition(data, 20).subscribe((data) => {
      this.last20 = data;

    })

  }

  navigate() {
    this.ngZone.run(() => this.router.navigateByUrl('/day-game', { state: { user: this.user } }));
  }

  onLogout() {
    this.ngZone.run(() => this.router.navigateByUrl('/'))
  }

}
