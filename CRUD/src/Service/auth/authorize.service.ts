import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt"
import { LoginService } from '../credential/login.service';
import { Roles } from 'src/enum/Role';


@Injectable({
  providedIn: 'root'
})

export class AuthorizeService {

  role$ = new BehaviorSubject<Roles>(Roles.None);
  Name$ = new BehaviorSubject<string>("");
  


  constructor(private cred:LoginService) { 
    
  }

  getName(){
    return this.Name$.asObservable();
  }

  getRole(){
    return this.role$.asObservable();
  }

  setRole(role:Roles){
    this.role$.next(role);
  }

  setName(name:string){
    this.Name$.next(name);
  }

  

}
