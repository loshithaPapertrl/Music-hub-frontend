import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './auth/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {ProfileConfigComponent} from "./auth/profile-config/profilecofig.component";
import {UserAccountsComponent} from "./auth/user-accounts/user-accounts.component";

const routes: Routes =[
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'landing',     component: LandingComponent },
    { path: 'auth/login',       component: LoginComponent },
    { path: 'account/profile',     component: ProfileComponent },
    { path: 'account/profile-cofig',     component: ProfileConfigComponent },
    { path: 'user-accounts',     component: UserAccountsComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
