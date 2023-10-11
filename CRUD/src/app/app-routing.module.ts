import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginUserComponent } from './authentication/login-user/login-user.component';
import { DashBoradComponent } from './admin/dash-borad/dash-borad.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { PreventLoginGuard } from 'src/Gaurd/preventLogin/prevent-login.guard';
import { HomeComponent } from './user/home/home.component';
import { UserGuard } from 'src/Gaurd/authorizeGuard/userGuard/user.guard';
import { AuthGuard } from 'src/Gaurd/auth.guard';

const route: Routes = [
  //{path:"dashboard",component:DashBoradComponent},
  // {path:"update",component:studentDetailsComponent},
  { path: "auth", 
  component: LoginUserComponent, 
  canActivate: [PreventLoginGuard] 
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    canActivate: [PreventLoginGuard]

  },
  //{path:"register",component:RegisterUserComponent},
  //{path:"table",component:TableComponent,canActivate:[AuthGuard]},
  //{path:"update/:id",component:studentDetailsComponent},
  { path: "", redirectTo: '/auth', pathMatch: "full" },
  //{path:"**",component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
