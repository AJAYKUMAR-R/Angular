import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Fee } from 'src/Model/Fee';
import { LoginService } from 'src/Service/credential/login.service';
import { StudentService } from 'src/Service/student-service/student.service';
import {MatGridListModule} from '@angular/material/grid-list';
import { Profile } from 'src/Model/Profile';
import { ResponsesData } from 'src/Model/ResponseData';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css'],
  standalone:true,
  imports:[RouterModule,MatGridListModule,CommonModule,MatCardModule]
  
})
export class FeeComponent implements OnInit {

  student:Fee | null = null;
  profile!:Profile;
  feeStatus:boolean = false;

  constructor(private fee:StudentService,private auth:LoginService) {
  }
  
 
  ngOnInit(): void {
    const email = this.auth.getEmailofUser();
    if(email != null){
      this.fee.GetProfile(email).subscribe({
        next:(resq:ResponsesData)=>{
         if(resq.statusMsg === "Success"){
          if(resq.data != null){
            this.profile = resq.data;              
          }
         }
        }
      })
    }
    
    if(email != null){
      this.fee.GetFee(email).subscribe({
        next:(res)=>{
         if(res.statusMsg === "Success"){
          if(res.data != null){
            this.student = res.data;  
            this.feeStatus = res.data.isPaid;            
          }
         }
        }
      })
    }

    
  }

  
}
