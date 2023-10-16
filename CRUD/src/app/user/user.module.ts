import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeeComponent } from './fee/fee.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/Gaurd/auth.guard';
import { UserGuard } from 'src/Gaurd/authorizeGuard/userGuard/user.guard';
import { ErrorComponent } from '../error/error.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HomeComponent,
    FeeComponent,
    RouterModule.forChild([
      {
        //admin
        path:"",
        component:HomeComponent,
        canActivate:[AuthGuard,UserGuard],
        children:[
          //admin/student/create
          {path:"fee",component:FeeComponent}
          //{path:"**",component:HomeComponent}
        ]
      },
      //{path:"**",component:HomeComponent}
      // { path: "", redirectTo: '/home', pathMatch: "full" },
    ])
  ]
})
export class UserModule { }