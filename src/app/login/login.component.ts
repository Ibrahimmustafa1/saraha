import { UserAuthService } from './../user-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    errorMsg!: string
    constructor(private UserAuthService: UserAuthService,private router:Router) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }
    login(form: FormGroup) {
        this.UserAuthService.login(form).subscribe(user => {
            localStorage.setItem('user', user.token)
            this.UserAuthService.isAuth.next(true)

        this.router.navigate(['/message'])
        },(err)=>{
            console.log(err);
            this.errorMsg=err.error.message
        })
  }
}
