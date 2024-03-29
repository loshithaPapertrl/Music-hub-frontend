import {Component, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {ProfileServiceService} from "../../services/profile-service.service";
import {DomSanitizer} from "@angular/platform-browser";
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    audioFiles: any[] = [
        {
            title: 'Audio 1',
            link: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
        },
        {
            title: 'Audio 2',
            link: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3'
        }
    ];
    playerSettings = {
        autoPlay: false,
        hideRewind: true,
        hideForward: true,
        shuffle: false,
        loop: false,
        color: '#000',
        title: 'Audio Player',
        artist: 'Unknown'
    };

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
    user: any = {};
    showReviews: any = false;
    comments: [] = [];
    audioByteArray: Uint8Array;
    audios: any[] = [];
    viewRating: any;


    constructor(public profileServiceService: ProfileServiceService, private sanitizer: DomSanitizer) {

    }

    ngOnInit() {
        var rellaxHeader = new Rellax('.rellax-header');

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        this.getProfileDetails();
        // this.getAudioPost();
        this.getPosts();
        this.getReviews();
        this.getRatingAsOwn();


    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    /**
     * this method use for get all the personal Reviews
     */

    getReviews() {
        this.profileServiceService.getPersonalReviews().subscribe((res: any) => {
            this.reviews = res.body
            // console.log(this.reviews)
        }, error => {
        });
    }

    /**
     * this method use for get all the personal post
     */

    getPosts() {
        this.profileServiceService.getPersonalPosts().subscribe((res: any) => {

            res.body.forEach(e => {
                if (e.postType == 'IMAGE') {
                    this.posts.push(e)
                }else {
                    this.audios.push(e)
                }
            })
            this.posts.forEach(post => {
                this.comments = post.comments
                // console.log( this.comments)
            })
            this.setImageUrl()
        }, error => {
        });
    }

    /**
     * this method use for get main profile details
     */

    getProfileDetails() {
        this.profileServiceService.getProfileDetails().subscribe((res: any) => {
            this.user = res.body
            let objectURL = 'data:image/png;base64,' + this.user.profilePicture;
            this.user.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }, error => {
        });
    }


    /**
     * this method use for get i byte array and show as image
     */

    setImageUrl() {
        this.posts.forEach((value, index) => {
            let objectURL = 'data:image/png;base64,' + value.postContent;
            this.posts[index].logoUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
    }

    // getAudioPost() {
    //     this.profileServiceService.getPersonalAudioPosts().subscribe((res: any) => {
    //         this.audios = res.body
    //         console.log(JSON.stringify(this.audios))
    //     }, error => {
    //     });
    // }

    getAudioSource(audio: any) {
        if (!audio) {
            return;
        }
        const audioBlob = new Blob([audio], {type: 'audio/mpeg'});
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(audioBlob));
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

    downloadMp3(audio:any) {
        // code to get the MP3 file as a byte array or base64 string goes here
        const blob = new Blob([audio], { type: 'audio/mp3' });
        saveAs(blob, 'filename.mp3');
    }

    getRatingAsOwn(){
        this.profileServiceService.getRatingByOwn().subscribe((res: any) => {
            this.viewRating = res.body
        }, error => {
        });
    }

}
