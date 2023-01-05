import { UserAuthService } from './../user-auth.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private UserAuthService:UserAuthService,private router:Router) { }
 isAuth!:boolean ;
  ngOnInit(): void {
    this.UserAuthService.isAuth.subscribe(isAuth =>{
        this.isAuth = isAuth;
    })
  }
  logout(): void {
    this.UserAuthService.isAuth.next(false);
    localStorage.removeItem('user')
    this.router.navigate(['/home'])

  }
}
