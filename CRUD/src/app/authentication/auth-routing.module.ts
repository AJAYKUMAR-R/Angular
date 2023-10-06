import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PreventLoginGuard } from 'src/Gaurd/preventLogin/prevent-login.guard';

// const routes: Routes = [
//   //{path:"dashboard",component:DashBoradComponent},
//     {path:"register",component:RegisterUserComponent},
//     {path:"login",component:LoginUserComponent},
//     {path:"",redirectTo:'/login',pathMatch:"full"}
// ];

export const routes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent,
    canActivate:[PreventLoginGuard]
  },
  {
    path: 'register',
    component: RegisterUserComponent,
    canActivate:[PreventLoginGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})

export class AuthRoutingModule { }
