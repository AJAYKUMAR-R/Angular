import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Roles } from 'src/enum/Role';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {

  constructor(private auth:AuthorizeService,private router:Router,private cred:LoginService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      const role = this.cred.getRolefUser();
      if(role === Roles.Admin){                
        this.router.navigate(['/dashboard/table']);
        return false;
      }else{
        return true;
      }
  }
  
}
