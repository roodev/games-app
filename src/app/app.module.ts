import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import{ ToastrModule } from "ngx-toastr"

import{ NavigationModule } from "./modules/navigation/navigation.module"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NavigationModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
