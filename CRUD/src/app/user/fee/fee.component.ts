import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Service/credential/login.service';
import { StudentService } from 'src/Service/student-service/student.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {

  student:any;

  constructor(private fee:StudentService,private auth:LoginService) {
  }
  ngOnInit(): void {
    const email = this.auth.getEmailofUser();
    if(email != null){
      this.fee.GetFee(email).subscribe({
        next:(res)=>{
         if(res.statusMsg === "Success"){
          if(res.data != null){

          }
         }
        }
      })
    }
  }

  
}
