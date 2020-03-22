import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { CalendarModule} from '@syncfusion/ej2-angular-calendars';

import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestComponent } from './components/guest/guest.component';
import { AdminComponent } from './components/admin/admin.component';
import { SupervizorComponent } from './components/supervizor/supervizor.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserForgetPasswordComponent } from './components/user-forget-password/user-forget-password.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserSecretQuestionComponent } from './components/user-secret-question/user-secret-question.component';
import { UserNewPasswordComponent } from './components/user-new-password/user-new-password.component';
import { AuthenticationGuard } from './authentication.guard';
import { DayGameComponent } from './components/day-game/day-game.component';
import { AnagramComponent } from './components/day-game/anagram/anagram.component';
import { MyNumberComponent } from './components/day-game/my-number/my-number.component';
import { Table55Component } from './components/day-game/table55/table55.component';
import { InterestingGeographyComponent } from './components/day-game/interesting-geography/interesting-geography.component';
import { GobletComponent } from './components/day-game/goblet/goblet.component';
import { GobletDetailsComponent } from './components/admin/goblet-details/goblet-details.component';
import { SupervizeGeographyComponent } from './components/supervizor/supervize-geography/supervize-geography.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    UserLoginComponent,
    GuestComponent,
    AdminComponent,
    SupervizorComponent,
    UserChangePasswordComponent,
    UserForgetPasswordComponent,
    UserHomeComponent,
    UserSecretQuestionComponent,
    UserNewPasswordComponent,
    DayGameComponent,
    AnagramComponent,
    MyNumberComponent,
    Table55Component,
    InterestingGeographyComponent,
    GobletComponent,
    GobletDetailsComponent,
    SupervizeGeographyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  providers: [AuthenticationGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
