import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/Service/credential/login.service';

@Component({
  selector: 'app-dash-borad',
  templateUrl: './dash-borad.component.html',
  styleUrls: ['./dash-borad.component.css']
})
export class DashBoradComponent implements OnInit{

  name!:string;
  role!:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private cred:LoginService) {}
  ngOnInit(): void {
   this.getDetails();
  }

  SignOut(){
    this.cred.signOut();
  }

  getDetails(){
    this.name = this.cred.getNameofUser();
    this.role = this.cred.getRolefUser();
    
  }
  

}
