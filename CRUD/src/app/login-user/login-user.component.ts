import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ResponsesData } from 'src/Model/ResponseData';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';
import { Validation } from 'src/utils/Validations/Validation';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css'],
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
  
  LoginForm!:FormGroup ;

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      userName:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]),
      userPassword:new FormControl('',[Validators.required])
    })
  }


  get userName(){
    return this.LoginForm?.get('userName');
  }

  get userPassword(){
    return this.LoginForm?.get('userPassword');
  }


  SignIn(){
    if(this.LoginForm.valid === true){
      this.cred.SignIn({
        Username : this.userName?.value,
        Password : this.userPassword?.value
      }).subscribe({
        next:(res:ResponsesData)=>{
          if(res != null){
            this.cred.storeToken(res.data);
            //this will add the user name and Role 
            const payload = this.cred.decodedToken();
            this.auth.setName(payload.name);
            this.auth.setRole(payload.role);
            this.router.navigate(['table']);
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

}
