import { Component, OnInit, NgZone } from '@angular/core';
import { Goblet } from 'src/app/model/goblet';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-goblet-details',
  templateUrl: './goblet-details.component.html',
  styleUrls: ['./goblet-details.component.css']
})
export class GobletDetailsComponent implements OnInit {

  private admin:User;
  goblet:Goblet;
  constructor(private router: Router,
    private ngZone: NgZone) {    
      
    this.admin = history.state.admin;
    this.goblet=history.state.data;
    if (this.admin == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
   }
   

  ngOnInit() {
  }
  onLogout() {
    this.ngZone.run(() => this.router.navigateByUrl('/user-logout'));
  }

  onAdmin(){
    this.ngZone.run(() => this.router.navigateByUrl('/admin',  { state: {admin: this.admin} }));
  }

}
