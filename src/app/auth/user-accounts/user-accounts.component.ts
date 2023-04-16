import {Component, Input, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register-service";
import {AuthService} from "../../services/auth-service.service";
import Swal from 'sweetalert2'
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {UserServiceService} from "../../services/user-service.service";
@Component({
  selector: 'app-user',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent implements OnInit {
  data : Date = new Date();
  focus;
  focus1;
  users: any [] = [];
  categoryId:any
  private userId: any;
  private isClickOnCategory: boolean = false;
  searchUser: any;

  constructor(private sanitizer: DomSanitizer, public userServiceService:UserServiceService,private activeRoute: ActivatedRoute,private router: Router,) {


  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    // this.activeRoute.params.subscribe(params => { console.log(params)});
    this.categoryId = this.activeRoute.snapshot.queryParamMap.get('categoryId');
    this.getUsers();
  }

  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  getUsers() {
    if (!this.categoryId){
      return;
    }
    this.userServiceService.getUsersCategoryVise(this.categoryId).subscribe((res: any) => {
      this.users = res.body
      console.log(res.body)
      this.setImageUrl()
    }, error => {
    });
  }

  searchUsers() {
    console.log("eeeeeeeeeeeeeeeee")
    console.log(this.searchUser)
    if (!this.searchUser) {
      this.getUsers();
    } else {
     this.users= this.users.filter(user => {
        return user.artistName.toLowerCase().includes(this.searchUser.toLowerCase());
      });
    }
  }

  setImageUrl() {
    this.users.forEach((value,index) => {
      let objectURL = 'data:image/png;base64,' + value.profilePicture;
      this.users[index].logoUrl  = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

  /**
   * support function to set image
   * @param buffer
   */

  public getBase64ImageFromArray(buffer: any): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + window.btoa(binary);
  }

  onClickUser(id:any) {
    this.userId = id
    this.isClickOnCategory = true
    this.router.navigate(['/user-profile'],{ queryParams: { userId: this.userId } });
  }
}
