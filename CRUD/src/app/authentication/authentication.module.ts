import { Component, NgModule } from '@angular/core';
import { DashBoradComponent } from '../admin/dash-borad/dash-borad.component';
import { studentDetailsComponent } from '../admin/student-details/update-student.component';
import { TableComponent } from '../admin/table/table.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';





@NgModule({
  declarations: [
  ],
  imports: [
    RegisterUserComponent,
    LoginUserComponent,
    DashBoradComponent,
    TableComponent,
    studentDetailsComponent,
  ],
  exports:[
    RegisterUserComponent,
    LoginUserComponent
  ]
})
export class AuthenticationModule {
 }
