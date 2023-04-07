import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register-service";
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;
  registerUserForm:FormGroup;


  constructor(public formBuilder: FormBuilder,
              public registerService: RegisterService, public authService: AuthService ) {

    this.registerUserForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null],
      artistName: [null],
      gender: [null],
      phoneNumber: [null],
      email: [null],
      username: [null],
      password: [null],
      role: ['user']
    });

  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
  }

  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  saveUserDetails(){
    this.registerService.registerUser(this.registerUserForm.value).subscribe((res: any) => {
      console.log(res)
    }, error => {

    });
  }
}
