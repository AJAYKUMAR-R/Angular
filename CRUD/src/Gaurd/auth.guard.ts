import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/Service/credential/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private cred:LoginService,private route:Router) {
    
  }
  canActivate(): boolean {
    if(this.cred.getToken()){
      return true;
    }else{
      this.route.navigate(["auth"]);
      return false;
    }
  }
  
}
