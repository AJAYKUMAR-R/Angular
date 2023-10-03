import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { TableComponent } from './admin/table/table.component';
import { studentDetailsComponent } from './admin/student-details/update-student.component';
import { AuthGuard } from 'src/Gaurd/auth.guard';
import { LoginUserComponent } from './authentication/login-user/login-user.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { AuthRoutingModule } from './authentication/auth-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';

const route: Routes = [
  //{path:"dashboard",component:DashBoradComponent},
  // {path:"update",component:studentDetailsComponent},
  {path:"auth",component:LoginUserComponent},
  // {path:"register",component:RegisterUserComponent},
  // {path:"table",component:TableComponent,canActivate:[AuthGuard]},
  // {path:"update/:id",component:studentDetailsComponent},
  {path:"",redirectTo:'/auth',pathMatch:"full"},
  //{ path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
