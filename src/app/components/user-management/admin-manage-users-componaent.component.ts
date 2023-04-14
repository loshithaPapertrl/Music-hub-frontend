import { Component, OnInit, Inject, Renderer2, ElementRef, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-nucleoicons',
    templateUrl: './admin-manage-users-componaent.component.html',
    styleUrls: ['./admin-manage-users-componaent.component.scss']
})
export class AdminManageUsersComponent implements OnInit, OnDestroy {

    constructor( private element : ElementRef) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

      navbar.classList.remove('navbar-transparent');
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

    }
}
