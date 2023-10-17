import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/Gaurd/auth.guard';
import { AdminGuard } from 'src/Gaurd/authorizeGuard/adminGuard/admin.guard';
import { LoginUserComponent } from '../authentication/login-user/login-user.component';
import { RegisterUserComponent } from '../authentication/register-user/register-user.component';
import { ErrorComponent } from '../error/error.component';
import { DashBoradComponent } from './dash-borad/dash-borad.component';
import { DialogComponent } from './dialog-component/dialog-component.component';
import { studentDetailsComponent } from './student-details/update-student.component';
import { TableComponent } from './table/table.component';
import { EditStudentComponent } from './edit-student/edit-student.component';


@NgModule({
  declarations: [
  ],
  imports: [
    DashBoradComponent,
    TableComponent,
    studentDetailsComponent,
    DialogComponent,
    EditStudentComponent,
    RouterModule.forChild([
      {
        //admin
        path:"",
        component:DashBoradComponent,
        canActivate:[AuthGuard,AdminGuard],
        children:[
          //admin/student/create
          { path: "update", component: studentDetailsComponent },
          //admin/student/update
          {path:"update/:id",component:studentDetailsComponent},
          //studentlist
          { path: "grid", component: TableComponent },
          { path: "edit", component: EditStudentComponent },
          //{path:"**",component:DashBoradComponent}
        ]
      },
      {path:"**",component:ErrorComponent}
      //{ path: "", redirectTo: '/dashboard', pathMatch: "full" },
      //{path:"**",component:DashBoradComponent}
      
    ])
  ]
})
export class AdminModule { }
