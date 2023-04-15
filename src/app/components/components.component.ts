import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import {AdminService} from "../services/admin.service";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./admin.component.scss']
})

export class ComponentsComponent implements OnInit, OnDestroy {
    data : Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    date: {year: number, month: number};
    model: NgbDateStruct;

    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;
    adminNote: any;
    notes:[]= []

    constructor( private renderer : Renderer2, config: NgbAccordionConfig,private adminService:AdminService, private sanitizer: DomSanitizer) {
        config.closeOthers = true;
        config.type = 'info';
    }
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
      var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
        this.getNotes();
    }
    ngOnDestroy(){
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    getNotes() {
        // get all notes using the admin service
        this.adminService.getAllNote().subscribe((res: any) => {
            this.notes = res.body
            console.log(this.notes)
        }, error => {
        });
    }

    addNote() {
        // Add the new note using the admin service
        this.adminService.addNote(this.adminNote).subscribe((res: any) => {
            if (res.status==200){
                Swal.fire('Note Added', '', 'success');
                this.notes=[];
                this.getNotes();
            }
        }, error => {
        });
    }

    deleteNote(id: any) {
        // delete note using the adminService service
        this.adminService.deleteNote(id).subscribe((res: any) => {
            if (res.status==200){
                Swal.fire('Deleted', '', 'success');
                this.notes=[];
                this.getNotes();
            }
        }, error => {
        });
    }
}
