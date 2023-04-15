import { Component, OnInit, Inject, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
    selector: 'app-nucleoicons',
    templateUrl: './admin-manage-users-componaent.component.html',
    styleUrls: ['./admin-manage-users-componaent.component.scss']
})
export class AdminManageUsersComponent implements OnInit, OnDestroy {

    users: [] = [];

    constructor( private element : ElementRef, private adminService:AdminService) {}

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

      navbar.classList.remove('navbar-transparent');
        this.getAllUsers();
    }

    ngOnDestroy(){
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];

    }


    getAllUsers(){
        this.adminService.getAllUsers().subscribe((res: any) => {
            this.users = res.body
            // console.log(this.reviews)
        }, error => {
        });
    }
}
