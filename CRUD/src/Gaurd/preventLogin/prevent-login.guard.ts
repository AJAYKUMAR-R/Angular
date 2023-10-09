import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/Service/credential/login.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginGuard{
  /**
   *
   */
  constructor(private cred:LoginService,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const refreshToken = this.cred.getToken();
      if(refreshToken != null){
        const role = this.cred.getRolefUser();
        if(role === "Admin"){
          this.router.navigate(['table'])
        }else{
          //this.router.navigate(['table'])
        }
       
        return false;
      }else{
        return true;
      }
    }
  
}
