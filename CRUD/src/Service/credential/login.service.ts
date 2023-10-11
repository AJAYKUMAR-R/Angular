import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Roles } from 'src/enum/Role';
import { environmentsVariables } from 'src/environments/crud-api/environments';
import { GetEmail } from 'src/Model/GetEmail';
import { RegisterUser } from 'src/Model/Register';
import { ResponsesData } from 'src/Model/ResponseData';
import { User } from 'src/Model/User';
import { UserTokens } from 'src/Model/UserTokens';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = environmentsVariables.Auth;

  private payload:any;

  constructor(private http:HttpClient,private router:Router) { 
    this.payload = this.decodedToken();
  }

  SignIn(loginuser:User):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(this.url,loginuser);
  }

  SignUp(register:RegisterUser):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(this.url + "/SignUp",register);
  }


  renewToken(UserTokens:UserTokens):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(`${this.url}/RefreshToken`,UserTokens);
  }

  getRefreshTokenFromServer(UserTokens:UserTokens):Observable<ResponsesData>{
    return this.http.post<ResponsesData>(`${this.url}/GetRefresh`,UserTokens);
  }

  EmailCheck(getMail:GetEmail){
    return this.http.post<ResponsesData>(this.url + "/EmailExists",getMail);
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
    this.router.navigate(['auth']);
  }

  public set payloads(pay:any){
    this.payload = pay;
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
      return this.payload.Name
  }

  getRolefUser():Roles | null{
    if(this.payload){
      const role = this.payload.Role;
      return role === "Admin"?Roles.Admin:Roles.User;
    }else{
      return null;
    }
  }
}
