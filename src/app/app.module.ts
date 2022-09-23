import { DatePipe } from '@angular/common';
import { NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { RightSidebarComponent } from "./layout/right-sidebar/right-sidebar.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { fakeBackendProvider } from "./core/interceptor/fake-backend";
import { ErrorInterceptor } from "./core/interceptor/error.interceptor";
import { JwtInterceptor } from "./core/interceptor/jwt.interceptor";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { TopbarComponent } from "./layout/topbar/topbar.component";
import { MatmenuComponent } from "./layout/matmenu/matmenu.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from '@angular/material/menu';
import { MatdynamicmenuComponent } from "./layout/matdynamicmenu/matdynamicmenu.component";
import { MatdynamicsubmenuComponent } from "./layout/matdynamicmenu/matdynamicsubmenu/matdynamicsubmenu.component";
import { MatnestedmenuComponent } from "./layout/matnestedmenu/matnestedmenu.component";
import { MatDialogModule } from "@angular/material/dialog";
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxPaginationModule } from 'ngx-pagination';

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { ClickOutsideModule } from "ng-click-outside";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { LordIconElement } from 'lord-icon-element';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PageLoaderComponent,
        SidebarComponent,
        RightSidebarComponent,
        AuthLayoutComponent,
        MainLayoutComponent,
        TopbarComponent,
        MatmenuComponent,
        MatdynamicmenuComponent,
        MatdynamicsubmenuComponent,
        MatnestedmenuComponent,
     ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
       // LordIconElement,
        HttpClientModule,
        PerfectScrollbarModule,
        ClickOutsideModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        // core & shared
        CoreModule,
        SharedModule,
        MatToolbarModule,
        MatMenuModule,
        NgxCaptchaModule,
        NgxPaginationModule,
    ],
    providers: [
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        // {
        //     provide: PERFECT_SCROLLBAR_CONFIG,
        //     useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
        // },
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // fakeBackendProvider,
        DatePipe,
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent], 


})
export class AppModule {}
