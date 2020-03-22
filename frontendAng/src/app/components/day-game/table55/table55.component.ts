import { Component, OnInit, NgZone } from '@angular/core';
import { Table55 } from 'src/app/model/table55';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-table55',
  templateUrl: './table55.component.html',
  styleUrls: ['./table55.component.css']
})
export class Table55Component implements OnInit {
  private table5x5: Table55;
  private dayGamePoints: DayGameUserPoints;
  private user: User;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    

  }

  ngOnInit() {
    this.user = history.state.user;
    if (this.user == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))

    this.table5x5 = history.state.dateT;
    this.dayGamePoints=history.state.dataGame;
   }


  onLogout() {
    
      this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
        (res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, (error) => {
          console.log(error);
        });
      //save daygamepoints to db

    
  }
  home() {
    
      this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
        (res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/user-home', { state: { user: this.user } }))
        }, (error) => {
          console.log(error);
        });
    }
  

}
