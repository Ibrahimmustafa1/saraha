import { UserAuthService } from './../user-auth.service';
import { Validator } from './../validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    errorMsg!: string
    constructor(private UserAuthService:UserAuthService,private router:Router) { }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            cpassword: new FormControl('', Validators.required),
        }, [Validator.match('password', 'cpassword')]);
    }
    register(form: FormGroup): void {
        this.UserAuthService.register(form).subscribe(res => {
        this.router.navigate(['/login']);
        },(err)=>{
            this.errorMsg= err.error.message
        })
    }
}
