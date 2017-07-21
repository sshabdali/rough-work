import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }   from '@angular/http';

import { AppComponent } from './app.component';
import { RedirectListComponent } from './redirect/redirect-list.component';
import { RedirectEditComponent } from './redirect/redirect-edit.component';
import { RedirectService } from "./services/redirect.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    RedirectService
  ],
  declarations: [
    AppComponent,
    RedirectListComponent,
    RedirectEditComponent
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
