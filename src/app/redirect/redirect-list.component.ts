import { Component, OnInit, ViewChild } from '@angular/core';
import { Redirect } from "../model/Redirect";
import { RedirectService } from "../services/redirect.service";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'redirect-list',
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.css']
})
export class RedirectListComponent implements OnInit {

  @ViewChild('formModal') form;
  @ViewChild('confirmModal') confirm;

  idToDelete = 0;
  redirects$: Observable<Redirect[]>;

  constructor(private redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this.redirects$ = this.redirectService.getRedirects();
  }

  showEditModel(redirectId: number) {
    this.form.showModal(redirectId);
  }

  showDeleteModel(idToDelete: number) {
    this.idToDelete = idToDelete;
    this.confirm.show();
  }

  deleteRow(id: number) {
    this.redirectService.deleteRedirect(id);
    this.confirm.hide();
  }

  cancelDelete() {
    this.confirm.hide();
  }
}
