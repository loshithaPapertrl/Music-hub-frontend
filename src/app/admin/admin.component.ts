import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../services/register-service";
import {AuthService} from "../services/auth-service.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;
  registerUserForm:FormGroup;
  submitted: boolean = false;
  categories:any[]
  isClickOnCategory = false;
  categoryId:any

  constructor() {

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

}
