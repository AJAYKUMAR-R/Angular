import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { Roles } from 'src/enum/Role';
import { ResponsesData } from 'src/Model/ResponseData';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';
import { Validation } from 'src/utils/Validations/Validation';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  encapsulation:ViewEncapsulation.None
})
export class LoginUserComponent implements OnInit{

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  /**
   *
   */
  constructor(private cred:LoginService,private router:Router,private auth:AuthorizeService ) {
    
  }

  response:string = "";
  errorArray:string[] = [];

  
  LoginForm!:FormGroup ;

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      userEmail:new FormControl('',[Validators.required,Validators.email]),
      userPassword:new FormControl('',[Validators.required])
    })
  }


  get userEmail(){
    return this.LoginForm?.get('userEmail');
  }

  get userPassword(){
    return this.LoginForm?.get('userPassword');
  }


  SignIn(){
    this.errorArray.splice(0,this.errorArray.length);
    if(this.LoginForm.valid === true){
      this.cred.SignIn({
        Email : this.userEmail?.value,
        Password : this.userPassword?.value
      }).subscribe({
        next:(result:ResponsesData)=>{
          if(result.statusMsg === "Success"){
            if(result.data != null){
              this.cred.storeToken(result.data.jwtTokens);
             // this.cred.storeRefreshToken(result.data.refreshTokens);
              //this will add the user name and Role 
              const payload = this.cred.decodedToken();
              this.cred.payloads = payload;
              
              this.auth.setName(payload.Name);
              
              if(payload.Role != "Admin"){
                this.auth.setRole(Roles.User);
                this.router.navigate(['/home']);
              }else{
                this.auth.setRole(Roles.Admin);
                this.router.navigate(['/dashboard/table']);
              }
            }else{
              this.errorArray.push(result.responseMessage);
            }
          }else{
            result.data.forEach((element:string) => {
              this.errorArray.push(element);
            });
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}
