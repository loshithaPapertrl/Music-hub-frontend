import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './auth/examples.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {RegisterService} from "./services/register-service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomInterceptor} from "./services/custom-interceptor.service";

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
    ],
    providers: [RegisterService,{
        provide: HTTP_INTERCEPTORS, useClass:CustomInterceptor,
        multi:true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
