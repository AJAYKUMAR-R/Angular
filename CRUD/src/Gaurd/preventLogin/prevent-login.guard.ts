import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/enum/Role';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { LoginService } from 'src/Service/credential/login.service';

@Injectable({
  providedIn: 'root'
})
export class PreventLoginGuard{
  /**
   *
   */
  constructor(private cred:LoginService,private router:Router,private auth:AuthorizeService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const refreshToken = this.cred.getToken();
      if(refreshToken != null){
        const role = this.cred.getRolefUser();
        this.router.navigate(['table']);
        if(role === Roles.Admin){
          this.router.navigate(['/dashboard/table']);
        }else{
          this.router.navigate(['home']);
        }
       
        return false;
      }else{
        return true;
      }
    }
  
}
