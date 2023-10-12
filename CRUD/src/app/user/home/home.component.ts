import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/Service/credential/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,RouterModule],
})
export class HomeComponent {

  
  constructor(private cred:LoginService) {

  }
  
  SignOut(){
    this.cred.signOut();
  }
}
