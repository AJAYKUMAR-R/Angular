import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResponsesData } from 'src/Model/ResponseData';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';
import { Validation } from 'src/utils/Validations/Validation';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule,CommonModule,RouterModule]
})
export class RegisterUserComponent {

   errorArray:string[] = []

  constructor(private cred:LoginService,private router:Router,private auth:AuthorizeService ) {
    
  }

  response!:string;

  registerForm!:FormGroup ;

  passwordRegx:RegExp =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+|~=`{}\[\]:;"'<>,.?/])(?!.*\s).{8,}$/;
  mailRegex:RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern(this.mailRegex)]),
      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegx)]),
      confirmPassword:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegx)]),
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
    this.errorArray.splice(0,this.errorArray.length);
    //if(this.registerForm.valid === true){
      //var flag = Validation.confirmPasswordCheck(this.userPassword?.value,this.userConfirmPassword?.value);
      //if(!flag){
        //this.errorArray.push("Password and Confirm password is not matching");
     // }
      this.cred.SignUp({
        StudentId:0,
        StudentName : this.userName?.value,
        Email:this.userEmail?.value,
        Password : this.userPassword?.value,
        ConfirmPassword : this.userPassword?.value,
        Pincode:parseInt(this.userPincode?.value),
        Country:this.userCountry?.value,
        Roles:this.userRole?.value
      }).subscribe({
        next:(res:ResponsesData)=>{
          if(res.data === true){
            this.registerForm.reset();
          }else{
            res.data.forEach((element:string) => {
              this.errorArray.push(element);
            });
          }
        },
        error:(response:HttpErrorResponse)=>{
          console.log(response);
        }
      })
    }
  }

//}
