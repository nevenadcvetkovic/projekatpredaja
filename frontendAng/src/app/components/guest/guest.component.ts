import { Component, OnInit, NgZone } from '@angular/core';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  date: Date;
  last20: any[]=[];
  lastMonth: any[]=[];
  mydayGamePoints: DayGameUserPoints;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) {


  }

  ngOnInit() {
    this.getDayGamePointsBest20();
    this.getLastMonth();
  }

  getDayGamePointsBest20() {
    this.date = new Date();
    this.date.setHours(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMinutes(0);
    this.date.setSeconds(0);
    this.date.setMilliseconds(0);
    
    this.apiService.getDayGamePointsDateCondition(null, 20).subscribe((data) => {
      this.last20 = data;

    })   

  }

  getLastMonth(){
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var data = JSON.stringify({ date: { $gte: firstDay } });
    this.apiService.getDayGamePointsDateCondition(null, 1000).subscribe((data) => {
      this.lastMonth = data;

    }) 

  }

}
