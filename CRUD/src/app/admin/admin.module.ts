import { NgModule } from '@angular/core';
import { LoginUserComponent } from '../authentication/login-user/login-user.component';
import { RegisterUserComponent } from '../authentication/register-user/register-user.component';
import { DashBoradComponent } from './dash-borad/dash-borad.component';
import { DialogComponent } from './dialog-component/dialog-component.component';
import { studentDetailsComponent } from './student-details/update-student.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    RegisterUserComponent,
    LoginUserComponent,
    DashBoradComponent,
    TableComponent,
    studentDetailsComponent,
  ]
})
export class AdminModule { }
