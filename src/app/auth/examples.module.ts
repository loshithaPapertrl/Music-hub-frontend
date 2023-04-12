import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import { ProfileConfigComponent } from './profile-config/profilecofig.component';
import {RegisterService} from "../services/register-service";
import {HttpClientModule} from "@angular/common/http";
import {UserAccountsComponent} from "./user-accounts/user-accounts.component";
import {RouterLink} from "@angular/router";
import {UserprofileComponent} from "./user-profile/userprofile.component";
import {AdminComponent} from "../admin/admin.component";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        }),
        ReactiveFormsModule,
        RouterLink
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ExamplesComponent,
        ProfileComponent,
        ProfileConfigComponent,
        UserAccountsComponent,
        UserprofileComponent,
        AdminComponent
    ],
    providers: [RegisterService]
})
export class ExamplesModule { }
