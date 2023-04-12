import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import {ProfileServiceService} from "../../services/profile-service.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
  }, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{"color": "#dedede"}, {"lightness": 21}]
  }, {
    "elementType": "labels.text.stroke",
    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
  }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
  }];
  data: Date = new Date();
  focus;
  focus1;
  image: any;
  reviews: [] = [];
  posts: any [] = [];
  user:any = {};
  showReviews: any = false;
  comments: [] = [];
  audioByteArray: Uint8Array;
  userId:any



  constructor(public profileServiceService: ProfileServiceService, private sanitizer: DomSanitizer,private activeRoute: ActivatedRoute,public authService: AuthService) {
    this.getReviews();
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');

    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.userId = this.activeRoute.snapshot.queryParamMap.get('userId');
    this.getProfileDetails();
    this.getPosts();
    this.getReviews();
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

  getReviews() {
    this.profileServiceService.getReviews(this.userId).subscribe((res: any) => {
      console.log(res.body)
      this.reviews = res.body
    }, error => {
    });
  }

  getPosts() {
    this.profileServiceService.getPosts(this.userId).subscribe((res: any) => {
      this.posts = res.body
      this.posts.forEach(post => {
        this.comments=post.comments
      })
      this.setImageUrl()
    }, error => {
    });
  }

  /**
   * this method use for get main profile details
   */

  getProfileDetails() {
    this.profileServiceService.getProfileDetailsByVisitor(this.userId).subscribe((res: any) => {
      this.user = res.body
      let objectURL = 'data:image/png;base64,' +  this.user.profilePicture;
      this.user.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }, error => {
    });
  }


  /**
   * this method use for get i byte array and show as image
   */

  setImageUrl() {
    this.posts.forEach((value,index) => {
      let objectURL = 'data:image/png;base64,' + value.postContent;
      this.posts[index].logoUrl  = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

  get audioSrc(): string {
    const blob = new Blob([this.audioByteArray], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
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

  toggleReviews() {
    this.showReviews = !this.showReviews;
  }
}