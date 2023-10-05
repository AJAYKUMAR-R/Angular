import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginUserComponent } from './authentication/login-user/login-user.component';
import { DashBoradComponent } from './admin/dash-borad/dash-borad.component';

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
