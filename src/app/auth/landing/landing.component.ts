import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register-service";
import {AuthService} from "../../services/auth-service.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";
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
  submitted: boolean = false;
  categories:any[]
  isClickOnCategory = false;
  categoryId:any

  constructor(public formBuilder: FormBuilder, private router: Router,
              public registerService: RegisterService, public authService: AuthService ) {

    this.registerUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      artistName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.pattern(/^\d{10}$/)],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user']
    });

  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.getCategories();
  }

  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  async saveUserDetails() {
    this.submitted = true;
    if (this.registerUserForm.invalid) {
      // form is invalid, show error messages or alert
      console.log("error............")
      return;
    }
    try {
      const res = await this.registerService.registerUser(this.registerUserForm.value).toPromise();
      if (res.status === 200) {
        await Swal.fire('Registered', '', 'success');
        this.registerUserForm.reset();
        await this.router.navigateByUrl('/auth/login');
      }
    } catch (error) {
      // Handle error
    }
  }

  goToUsers() {
    this.router.navigateByUrl('user-accounts');
  }

  getCategories(){
    this.registerService.getCategories().subscribe((res: any) => {
      this.categories=res.body
      console.log(res.body)
    }, error => {
    });
  }

  onClickCategory(number: number) {
    this.categoryId = number
    this.isClickOnCategory = true
    this.router.navigate(['/user-accounts'],{ queryParams: { categoryId: this.categoryId } });
  }
}
