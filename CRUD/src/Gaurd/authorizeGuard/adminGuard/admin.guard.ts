import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Roles } from 'src/enum/Role';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private cred:LoginService,private router:Router,private auth:AuthorizeService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      const role = this.cred.getRolefUser();
      if(role === Roles.Admin){
        return true;
      }else{
        this.router.navigate(['student']);
        return false;
      }
      
  }
  
}
