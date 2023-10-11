import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/Service/credential/login.service';
import { AuthorizeService } from 'src/Service/auth/authorize.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-borad',
  templateUrl: './dash-borad.component.html',
  styleUrls: ['./dash-borad.component.css'],
  standalone:true,
  imports:[MatSidenavModule,MatToolbarModule,MatListModule,MatIconModule,RouterModule,CommonModule]
})
export class DashBoradComponent implements OnInit{

  name!:string;
  role!:string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private cred:LoginService,private auth:AuthorizeService) {}
  ngOnInit(): void {
   this.getDetails();
  }

  SignOut(){
    this.cred.signOut();
  }

  getDetails(){
    this.auth.getName().subscribe((res)=>{
      this.name = res;
    }) 
  }
  

}
