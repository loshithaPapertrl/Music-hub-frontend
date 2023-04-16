import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../services/token.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;
    errorMessage: any;
    loginObj:any={
        email:'',
        password:''
    };

    constructor(private authService: AuthService,
                private router: Router,private fb:FormBuilder,private tokenService: TokenService ) {
    }

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
            this.authService.login(this.loginObj)
                .subscribe(
                    (res:any) => {
                        console.log('res',res);
                        this.tokenService.setToken(res.token)
                        localStorage.setItem('token',res.token)
                        console.log(res.role)
                        if (res.isActive==false){
                            Swal.fire('Your account suspended', '', 'warning');
                            return;
                        }
                        if (res.role=='admin'){
                            this.router.navigateByUrl('/admin')
                        }else {
                            this.router.navigateByUrl('/account/profile-cofig')
                        }
                    }
                );
    }
}
