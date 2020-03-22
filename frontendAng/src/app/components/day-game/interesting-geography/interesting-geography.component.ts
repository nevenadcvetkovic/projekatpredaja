import { Component, OnInit, NgZone } from '@angular/core';
import { Goblet } from 'src/app/model/goblet';
import { Table55 } from 'src/app/model/table55';
import { DayGameUserPoints } from 'src/app/model/day-game-user-points';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { timer, Subscription } from 'rxjs';
import { Letters } from '../letters';
import { async } from 'q';

@Component({
  selector: 'app-interesting-geography',
  templateUrl: './interesting-geography.component.html',
  styleUrls: ['./interesting-geography.component.css']
})
export class InterestingGeographyComponent implements OnInit {
  private goblet: Goblet;
  private table5x5: Table55;
  private dayGamePoints: DayGameUserPoints;
  private user: User;
  private myTimerSub: Subscription;
  geographyForm: FormGroup;
  submitted = false;
  timer: number;
  result = 0;
  points = 0;
  visibleT = false;
  visible = false;
  cleared = false;
  letter: String = "";
  visibleI = true;
  letterClass = new Letters();
  existInTheDatabase = [0, 0, 0, 0, 0, 0, 0, 0]
  returnedData = [0, 0, 0, 0, 0, 0, 0, 0]
  categories = ['country', 'city', 'lake', 'mountain', 'river', 'animal', 'plant', 'band']
  countEmpty = 0;
  countSuccess = 0;
  countToSupervize = 0;
  count = 0;
  message = '';
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
    this.points = this.dayGamePoints.points;
    this.timer = 10;
    const ti = timer(2000, 1000);
    this.myTimerSub = ti.subscribe(t => {
      if (this.timer != 0)
        this.timer -= 1;
      else if (!this.cleared) {
        this.clearMyInterval();
      }
      else if (!this.submitted) {
        this.visibleT = false;
        this.onSubmit();
      }
    });
    this.visibleT = true;
  }

  ngOnDestroy() {
    this.myTimerSub.unsubscribe();
  }

  ngOnInit() { }

  mainForm() {
    this.geographyForm = this.fb.group({
      country: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      city: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      lake: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      mountain: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      river: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      animal: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      plant: ['', [Validators.pattern('[a-zA-Z\\s]*$')]],
      band: ['', [Validators.pattern('[a-zA-Z\\s]*$')]]

    });
  };

  // Getter to access form control
  get myForm() {
    return this.geographyForm.controls;
  }
  getRandom(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  myVar = setInterval(() => {
    var min = 0;
    var max = 29;
    var index = this.getRandom(min, max);
    this.letter = this.letterClass.getLetter(index);
  }, 200);

  clearMyInterval() {
    clearInterval(this.myVar);
    this.timer = 120;
    this.cleared = true;
    this.visible = false;
    this.visibleT = true;
    this.visibleI = false

  }

  //return the form for the request for the database and to create the request for the supervizor
  createForm(letterG, categoryG, wordG): String {
    var form = this.fb.group({
      letter: [letterG],
      category: [categoryG],
      word: [wordG]
    });
    return form.value;
  }

  async onSubmit() {
    this.submitted = true;
    this.visibleT = false;
    //check is it in the database
    for (var i = 0; i < 8; i++) {
      await this.executeQuery(i);
    }
    //wait for all to finish
    /*  var countV = this.countEmpty+this.countSuccess+this.countToSupervize;
      while (countV!=8) {
        this.sleep(2000);
        countV = this.countEmpty+this.countSuccess+this.countToSupervize;
      }*/
    console.log('poslati svi zahtevi')
    console.log(this.existInTheDatabase)
    console.log(this.countToSupervize);
    if (this.countToSupervize != 0 && confirm('Do you want to confirm the data that doesn\'t exist in the database?')) {
      await this.saveSupervizeReq();
      /* while (this.count!=this.countToSupervize) {
         this.sleep(3000);
       }*/
      console.log('poslati svi zahtevi supervizor')

      await this.waitTheSupervizor();
      console.log('javio se supervizor')

      await this.checkSupervizedAnswers();

      console.log('dohvaceni iz baze promenjeni')

      /*
            while (this.count!=this.countToSupervize) {
              this.sleep(3000);
          }*/

    }
    this.visible = true;

  }
  /*
 doTheSupervizorCall() {
   console.log('caocacao')
   this.existInTheDatabase.forEach(element => {
     if (element == 1)
       this.countSuccess++;
     if (element == 2)
       this.countEmpty++
   });
   var countReq = 8 - this.countEmpty - this.countSuccess;
   var index = 0;
   if (countReq > 0 && confirm('Do you want to confirm the data that don\'t exist i the database?')) {
     this.existInTheDatabase.forEach(element => {
       if (element == 0) {
         this.apiService.insertGeoWordSupervize(
           this.createForm(this.letter, this.categories[index], this.geographyForm.get(this.categories[index]).value)).subscribe((data) => {
           });
         index++;
       }
     });

     var waitFlag = true;
     this.message = 'Waiting for the supervizor...'
     while (waitFlag) {
       this.sleep(2000);
       var count = 0;
       index = 0;
       this.existInTheDatabase.forEach(element => {
         if (element == 0) {
          /* this.apiService.getGeographyRowSupervized(
             /*this.createForm(this.letter, this.categories[index], this.geographyForm.get(this.categories[index]).value)).subscribe((data) => {
               console.log(data);
               if (data == null) {
                 count++;
                 element = 1;
               }
             });

         }
         index++;
       });

       if (count == countReq)
         waitFlag = false;

     }
     index = 0;
     this.existInTheDatabase.forEach(element => {
       if (element == 0) {
         this.apiService.getGeographyRow(
           this.createForm(this.letter, this.categories[index], this.geographyForm.get(this.categories[index]).value)).subscribe((data) => {
             if (data != null)
               this.points += 4;
             else console.log(index);
           });
       }
       index++;
     });

   }



   this.visible = true;
 }
*/
  async executeQuery(index) {
    var value = this.geographyForm.get(this.categories[index]).value
    if (value === "") {
      console.log('prazan')
      this.existInTheDatabase[index] = 2;
      this.returnedData[index] = -1;
      this.countEmpty++;
    } else {
      console.log('ima')
      var data = await this.apiService.getGeographyRow(this.createForm(this.letter, this.categories[index], value))
      if (data != null) {
        console.log('ima')
        this.points += 2;
        this.existInTheDatabase[index] = 1;
        this.countSuccess++;
      } else {
        console.log('neam')
        this.countToSupervize++;
        this.returnedData[index] = 1;
      }
      console.log('index')
    }
  }

  async saveSupervizeReq() {
    for (var i = 0; i < 8; i++) {
      var element = this.existInTheDatabase[i];
      if (element == 0) {
        var value = this.geographyForm.get(this.categories[i]).value
        var data = await this.apiService.insertGeoWordSupervize(this.createForm(this.letter, this.categories[i], value));
      }

    }
  }
  async waitTheSupervizor() {
    var count = 0;
    var waitFlag = true;
    this.message = 'Waiting for the supervizor...'
    console.log(this.message)
    while (waitFlag) {
      console.log(this.message)
      this.sleep(5000);
      for (var i = 0; i < 8; i++) {
        var element = this.existInTheDatabase[i];
        if (element == 0) {
          var data = await this.apiService.getGeographyRowSupervized(
            this.createForm(this.letter, this.categories[i], this.geographyForm.get(this.categories[i]).value))
          if (data == null) {
            count++;
            this.existInTheDatabase[i] = 3;
        }else{
          console.log(data)
        }
        };
      }
      if (count == this.countToSupervize)
        waitFlag = false;
    }
  }

  async checkSupervizedAnswers() {
    var index = 0;
    this.count = 0;
    console.log(this.existInTheDatabase)
    for (var i = 0; i < 8; i++) {
      var element = this.existInTheDatabase[i];
      if (element == 3) {
        var data = await this.apiService.getGeographyRow(this.createForm(this.letter, this.categories[i], this.geographyForm.get(this.categories[i]).value));
        if (data != null)
          this.points += 4;
        else console.log(index);
        this.count++;
        console.log('final')
      }

    }

  }


  /*
    calculateExistInTheDatabase() {
      var value = this.geographyForm.get('country').value
      if (value === "")
        this.existInTheDatabase[0] = 2;
      else {
        this.apiService.getGeographyRow(this.createForm(this.letter, 'country', value)).subscribe((data) => {
          if (data != null) {
            this.points += 2;
            this.existInTheDatabase[0] = 1;
          }
   
          value = this.geographyForm.get('city').value
          if (value === "")
            this.existInTheDatabase[1] = 2;
          else {
            this.apiService.getGeographyRow(this.createForm(this.letter, 'city', value)).subscribe((data) => {
              if (data != null) {
                this.points += 2;
                this.existInTheDatabase[1] = 1;
              }
   
              value = this.geographyForm.get('lake').value
              if (value === "")
                this.existInTheDatabase[2] = 2;
              else {
                this.apiService.getGeographyRow(this.createForm(this.letter, 'lake', value)).subscribe((data) => {
                  if (data != null) {
                    this.points += 2;
                    this.existInTheDatabase[2] = 1;
                  }
   
                  value = this.geographyForm.get('mountain').value
                  if (value === "")
                    this.existInTheDatabase[3] = 2;
                  else {
                    this.apiService.getGeographyRow(this.createForm(this.letter, 'mountain', value)).subscribe((data) => {
                      if (data != null) {
                        this.points += 2;
                        this.existInTheDatabase[3] = 1;
                      }
                      value = this.geographyForm.get('river').value
                      if (value === "")
                        this.existInTheDatabase[4] = 2;
                      else {
                        this.apiService.getGeographyRow(this.createForm(this.letter, 'river', value)).subscribe((data) => {
                          if (data != null) {
                            this.points += 2;
                            this.existInTheDatabase[4] = 1;
                          }
   
                          value = this.geographyForm.get('animal').value
                          if (value === "")
                            this.existInTheDatabase[5] = 2;
                          else {
                            this.apiService.getGeographyRow(this.createForm(this.letter, 'animal', value)).subscribe((data) => {
                              if (data != null) {
                                this.points += 2;
                                this.existInTheDatabase[5] = 1;
                              }
                              value = this.geographyForm.get('plant').value
                              if (value === "")
                                this.existInTheDatabase[6] = 2;
                              else {
                                this.apiService.getGeographyRow(this.createForm(this.letter, 'plant', value)).subscribe((data) => {
                                  if (data != null) {
                                    this.points += 2;
                                    this.existInTheDatabase[6] = 1;
                                  }
                                  if (value === "")
                                    this.existInTheDatabase[6] = 2;
                                  else {
                                    this.apiService.getGeographyRow(this.createForm(this.letter, 'band', value)).subscribe((data) => {
                                      if (data != null) {
                                        this.points += 2;
                                        this.existInTheDatabase[7] = 1;
                                      }
                                      this.doTheSupervizorCall();
                                    })
                                  }
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
   
            })
          }
        })
      }
    }
  */
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }


  nextGame() {
    this.dayGamePoints.points = this.points;
    this.ngZone.run(() => this.router.navigateByUrl('/goblet', { state: { user: this.user, dataG: this.goblet, dataT: this.table5x5, dataGame: this.dayGamePoints } }))
  }
  onLogout() {
    if (confirm('Are you sure you want to logout? You won\'t be able to finish the game!')) {
      this.apiService.insertDayGamePoints(this.dayGamePoints).subscribe(
        (res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, (error) => {
          console.log(error);
        });

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
