import { Component, OnInit, Inject, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import * as jsPDF from "jspdf";
import html2canvas from "html2canvas";


@Component({
    selector: 'app-nucleoicons',
    templateUrl: './admin-manage-users-componaent.component.html',
    styleUrls: ['./admin-manage-users-componaent.component.scss']
})
export class AdminManageUsersComponent implements OnInit, OnDestroy {

    users:any [] = [];
    isChecked: boolean;
    check: any;

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

    toggleUserAccount(id: any, isChecked: boolean) {

    }

    toggleUserStatus(id: any) {
        this.users.forEach(user => {
            if (user.id==id){
                user.isActive = !user.isActive;
                this.adminService.updateUserStatus(id,user.isActive).subscribe((res: any) => {
                    console.log(user.isActive)
                }, error => {
                });
            }

        })
        // TODO: Make API call to update user's active status
    }

    generatePDF() {
        // const doc = new jsPDF.default();
        // const section = document.getElementById('my-section');
        // const sectionText = section.textContent; doc.text(sectionText, 0, 0); doc.save('section.pdf');
        const section = document.getElementById('my-section');
        html2canvas(section).then((canvas) => {

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF.default('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); pdf.save('section.pdf'); });
    }
}
