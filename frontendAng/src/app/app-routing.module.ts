import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminComponent } from './components/admin/admin.component';
import { GuestComponent } from './components/guest/guest.component';
import { SupervizorComponent } from './components/supervizor/supervizor.component';
import { UserForgetPasswordComponent } from './components/user-forget-password/user-forget-password.component';
import { UserChangePasswordComponent } from './components/user-change-password/user-change-password.component';
import { UserNewPasswordComponent } from './components/user-new-password/user-new-password.component';
import { UserSecretQuestionComponent } from './components/user-secret-question/user-secret-question.component';
import { AuthenticationGuard } from './authentication.guard';
import { GobletDetailsComponent } from './components/admin/goblet-details/goblet-details.component';
import { DayGameComponent } from './components/day-game/day-game.component';
import { GobletComponent } from './components/day-game/goblet/goblet.component';
import { AnagramComponent } from './components/day-game/anagram/anagram.component';
import { InterestingGeographyComponent } from './components/day-game/interesting-geography/interesting-geography.component';
import { MyNumberComponent } from './components/day-game/my-number/my-number.component';
import { Table55Component } from './components/day-game/table55/table55.component';
import { SupervizeGeographyComponent } from './components/supervizor/supervize-geography/supervize-geography.component';


const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'user-login' },//make a logo and leave this home page
{ path: 'user-create', component: UserCreateComponent },
{ path: 'user-edit/:id', component: UserEditComponent },
{ path: 'user-list', component: UserListComponent },
{ path: 'user-login', component: UserLoginComponent},
{ path: 'user-home', component: UserHomeComponent},
{ path: 'user-forget-password', component: UserForgetPasswordComponent},
{ path: 'user-change-password', component: UserChangePasswordComponent},
{ path: 'admin', component: AdminComponent},
{ path: 'guest', component: GuestComponent},
{ path: 'supervizor', component: SupervizorComponent},
{ path: 'user-forget-password', component: UserForgetPasswordComponent},
{ path: 'user-new-password', component: UserNewPasswordComponent},
{ path: 'user-secret-question', component: UserSecretQuestionComponent},
{ path: 'goblet-details', component: GobletDetailsComponent},
{ path: 'day-game', component:DayGameComponent},
{ path: 'anagram', component:AnagramComponent},
{ path: 'goblet', component:GobletComponent},
{ path: 'interesting-geography', component:InterestingGeographyComponent},
{ path: 'my-number', component:MyNumberComponent},
{ path: 'table55', component:Table55Component},
{ path: 'supervize-geography', component: SupervizeGeographyComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
