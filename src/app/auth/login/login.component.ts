import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;
    email: any;
    password: any;
    errorMessage: any;

    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    onSubmit() {
        this.authService.login(this.email, this.password).subscribe((res:any) => {
            console.log(res);
            const token = res.token;
            this.authService.setToken(token);
            this.router.navigate(['/auth/profile-config']);

        })
            // .then(() => {
            //     this.router.navigate(['/auth/profile-config']);
            // })
            // .catch((error) => {
            //     this.errorMessage = error.message;
            // });
    }
}
