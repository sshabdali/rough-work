import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { RedirectListComponent } from './redirect/redirect-list.component';
import { RedirectEditComponent } from './redirect/redirect-edit.component';
import { RedirectService } from "./services/redirect.service";
import { DialogService } from "./common/dialog.service";
import { ConfirmComponent } from "./common/confirm.component";
import { ModalComponent } from "./common/modal.component";
import { HostDirective } from "./common/host.directive";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    RedirectService,
    DialogService
  ],
  declarations: [
    AppComponent,
    RedirectListComponent,
    RedirectEditComponent,
    ConfirmComponent,
    ModalComponent,
    HostDirective
  ],
  entryComponents: [RedirectEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
