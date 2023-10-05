import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environmentsVariables } from 'src/environments/crud-api/environments';
import { RegisterUser } from 'src/Model/Register';
import { ResponsesData } from 'src/Model/ResponseData';
import { User } from 'src/Model/User';
import { UserTokens } from 'src/Model/UserTokens';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = environmentsVariables.Auth;

  private readonly payload:any;

  constructor(private http:HttpClient,private router:Router) { 
    //this.payload = this.decodedToken();
  }

  SignIn(loginuser:User):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(this.url,loginuser);
  }

  SignUp(register:RegisterUser):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(this.url + "/SignUp",register);
  }

  storeToken(tokenValue: string){
    //session storage
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  renewToken(UserTokens:UserTokens):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(`${this.url}/RefreshToken`,UserTokens);
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  decodedToken(){
    const jwt = new JwtHelperService();
    const token = this.getToken()!;
    if(token === null){
      console.log("Token is not There");
    }else{
      console.log("Token is There");
    }
    console.log(jwt.decodeToken(token));
    return jwt.decodeToken(token)  
  }

  getNameofUser(){
    if(this.payload)
    return this.payload.name
  }

  getRolefUser(){
    if(this.payload)
    return this.payload.role;
  }
}
