import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { DashBoradComponent } from './dash-borad/dash-borad.component';
import { ErrorComponent } from './error/error.component';
import { TableComponent } from './table/table.component';
import { studentDetailsComponent } from './student-details/update-student.component';

const routes: Routes = [
  //{path:"dashboard",component:DashBoradComponent},
  {path:"update",component:studentDetailsComponent},
  {path:"table",component:TableComponent},
  {path:"update/:id",component:studentDetailsComponent},
  {path:"",redirectTo:'/table',pathMatch:"full"},
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
