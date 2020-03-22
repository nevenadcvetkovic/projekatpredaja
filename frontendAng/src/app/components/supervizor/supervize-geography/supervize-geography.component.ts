import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Geography } from 'src/app/model/geography';

@Component({
  selector: 'app-supervize-geography',
  templateUrl: './supervize-geography.component.html',
  styleUrls: ['./supervize-geography.component.css']
})
export class SupervizeGeographyComponent implements OnInit {

  private supervizor: User;
  geographyTerms: any = [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.supervizor = history.state.supervizor;
    if (this.supervizor == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    this.readTerms();
  }
  ngOnInit() {
  }

  acceptRequest(term: Geography, index) {
    this.apiService.insertGeoWord(term).subscribe((data) => {
      this.geographyTerms.splice(index, 1);
      this.apiService.deleteGeoRowSupervized(term._id).subscribe((data) => {
      })

    })
  }

  rejectRequest(term:Geography, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteGeoRowSupervized(term._id).subscribe((data) => {
        this.geographyTerms.splice(index, 1);
      })
    }
  }

  readTerms() {
    console.log('sacs')
    this.apiService.getGeoRowsSupervized().subscribe((data) => {
      this.geographyTerms = data;
      console.log(data);
    })
  }

  onLogout() {
    this.ngZone.run(() => this.router.navigateByUrl('/user-logout'));
  }

  onSupervizor() {
    this.ngZone.run(() => this.router.navigateByUrl('/supervizor', { state: { supervizor: this.supervizor } }));
  }
}
