import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { TableComponent } from './table/table.component';
import { studentDetailsComponent } from './student-details/update-student.component';
import { AuthGuard } from 'src/Gaurd/auth.guard';
import { LoginUserComponent } from './login-user/login-user.component';

const routes: Routes = [
  //{path:"dashboard",component:DashBoradComponent},
  {path:"update",component:studentDetailsComponent},
  {path:"login",component:LoginUserComponent},
  {path:"table",component:TableComponent,canActivate:[AuthGuard]},
  {path:"update/:id",component:studentDetailsComponent},
  {path:"",redirectTo:'/update',pathMatch:"full"},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
