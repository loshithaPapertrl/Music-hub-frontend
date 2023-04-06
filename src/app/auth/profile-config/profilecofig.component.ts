import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import {RegisterService} from "../../services/register-service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-profile',
    templateUrl: './profilecofig.component.html',
    styleUrls: ['./profilecofig.component.scss']
})
export class ProfileConfigComponent implements OnInit {
    zoom: number = 14;
    lat: number = 44.445248;
    lng: number = 26.099672;
    styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
    data : Date = new Date();
    focus;
    focus1;
    saveProfileDetail:FormGroup;
    private profilePicture: any;

    constructor(public formBuilder: FormBuilder, public registerService: RegisterService) {

        this.saveProfileDetail = this.formBuilder.group({
          profilePicture: [],
          profession: [null],
          genres: [null],
          moods: [null],
          about: [null],
          youtubeLink: [null],
          spotifyLink: [null]
        });
    }

    ngOnInit() {
        var rellaxHeader = new Rellax('.rellax-header');

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    saveProfile(){
        this.registerService.saveProfile(this.saveProfileDetail.value).subscribe((res: any) => {
            console.log(res)
        }, error => {
        });
    }

    uploadProf(event: any) {
        const file: File = event.target.files[0];
        console.log(file)
        this.saveProfileDetail.patchValue({
            profilePicture: file
        })
    }
}
