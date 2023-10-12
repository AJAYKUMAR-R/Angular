import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeeComponent } from './fee/fee.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/Gaurd/auth.guard';
import { UserGuard } from 'src/Gaurd/authorizeGuard/userGuard/user.guard';



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
        path:"home",
        component:HomeComponent,
        canActivate:[AuthGuard,UserGuard],
        children:[
          //admin/student/create
          {path:"fee",component:FeeComponent},
        ]
      }
    ])
  ]
})
export class UserModule { }
