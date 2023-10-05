import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/Gaurd/auth.guard';
import { LoginUserComponent } from '../authentication/login-user/login-user.component';
import { RegisterUserComponent } from '../authentication/register-user/register-user.component';
import { DashBoradComponent } from './dash-borad/dash-borad.component';
import { DialogComponent } from './dialog-component/dialog-component.component';
import { studentDetailsComponent } from './student-details/update-student.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [

  ],
  imports: [
    DashBoradComponent,
    TableComponent,
    studentDetailsComponent,
    DialogComponent,
    RouterModule.forChild([
      {
        path:"dashboard",
        component:DashBoradComponent,
        canActivate:[AuthGuard],
        children:[
          { path: "update", component: studentDetailsComponent },
          {path:"update/:id",component:studentDetailsComponent},
          { path: "table", component: TableComponent }
        ]
      }
    ])
  ]
})
export class AdminModule { }
