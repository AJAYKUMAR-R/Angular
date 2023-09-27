import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponsesData } from 'src/Model/ResponseData';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  constructor(private cred:LoginService,private router:Router,private auth:AuthorizeService ) {
    
  }

  response!:string;

  registerForm!:FormGroup ;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required]),
      pincode:new FormControl('',[Validators.required]),
      country:new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required])
    })
  }


  get userName(){
    return this.registerForm?.get('name');
  }

  get userPassword(){
    return this.registerForm?.get('password');
  }

  get userEmail(){
    return this.registerForm?.get('email');
  }

  get userPincode(){
    return this.registerForm?.get('pincode');
  }
  get userConfirmPassword(){
    return this.registerForm?.get('confirmPassword');
  }

  get userCountry(){
    return this.registerForm?.get('country');
  }

  get userRole(){
    return this.registerForm?.get('role');
  }


  SignUp(){
    if(this.registerForm.valid === true){
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
