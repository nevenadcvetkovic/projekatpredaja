import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DayGame } from 'src/app/model/day-game';
import { Anagram } from 'src/app/model/anagram';
import { Goblet } from 'src/app/model/goblet';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  private admin:User;
  Users: any = [];
  Anagrams: any = [];
  Goblets: any = [];
  Games: any = [];
  date: Date;
  DayGame: DayGame = new DayGame();
  adminForm: FormGroup;
  saveForm: FormGroup;
  public value: Date[] = [];
  public multiselect: Boolean = true;
  message = '';
  visible = false;
  visibleD=false;
  first = true;

  constructor(public fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.admin = history.state.admin;
    if (this.admin == null)
      this.ngZone.run(() => this.router.navigateByUrl('/'))
    this.readUsers();
    this.readAnagrams();
    this.readGoblets();
    this.adminForm = this.fb.group({});
    this.saveForm = this.fb.group({});

  }

  ngOnInit() { }


  get myForm() {
    return this.adminForm.controls;
  }

  readUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.Users = data;
    })
  }

  acceptRequest(user: User) {
    user.isApproved = true;
    this.apiService.updatePassword(user.username, user).subscribe((data) => {
    })
  }

  removeUser(user, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteUser(user._id).subscribe((data) => {
        this.Users.splice(index, 1);
      })
    }
  }
  readDayGames() {
    this.apiService.getDayGames().subscribe((data) => {
      this.Games = data;
      this.Games.forEach((element) => {
        this.value.push(new Date(element.date))

      });

    })
  }


  readAnagrams() {
    this.apiService.getAnagrams().subscribe((data) => {
      this.Anagrams = data;
    })
  }
  setAnagram(anagram: Anagram) {
    this.DayGame.anagram = anagram._id;

  }

  readGoblets() {
    this.apiService.getGoblets().subscribe((data) => {
      this.Goblets = data;
    })
  }

  setGoblet(goblet: Goblet) {
    this.DayGame.goblet = goblet._id;
  }

  gobletDetails(goblet: Goblet) {
    this.ngZone.run(() => this.router.navigateByUrl('/goblet-details', { state: {admin: this.admin, data: goblet } }));
  }

  dateClicked(args: any) {
    this.visible=false;
    if (this.first){
      this.readDayGames();
      this.first=false;
      this.visible=false
    }
    else {
      console.log(this.value);
      this.date = args.value;
      if (this.value != null && this.value.includes(this.date)) {
        this.message = 'You have to choose a date that isn\'t selected!'
        this.visibleD = true;
      } else if (new Date() > this.date) {
        this.message = 'You have to choose a date after today!'
        this.visibleD = true;
      } else {
        this.visibleD = false;
        this.message = '';
        this.DayGame.date = this.date;
      }
    }
    //console.log(args.value.toLocaleDateString());
  }

  onLogout() {
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }

  onSubmit() {
    if (this.DayGame.anagram == null) {
      this.visible = true;
      this.message = 'You have to choose an anagram!'
    } else if (this.DayGame.date == null) {
      this.visible = true;
      this.message = 'You have to choose a date!'
    } else if (this.DayGame.goblet == null) {
      this.visible = true;
      this.message = 'You have to choose a goblet!'
    } else {
      this.apiService.insertDayGame(this.DayGame).subscribe(
        (res) => {
          this.message = 'Day game successfully created!';
          this.visible = true;
          this.value.push(this.DayGame.date);
          this.DayGame.date=null;
          this.DayGame.anagram=null;
          this.DayGame.goblet=null;
        }, (error) => {
          console.log(error);
        });
    }

  }


}
