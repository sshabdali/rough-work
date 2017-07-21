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

  @ViewChild('modalForm') modal;
  @ViewChild('confirmModal') confirm;

  selectedRedirectId = 0;
  idToDelete = 0;
  pageTitle: string;
  redirects$: Observable<Redirect[]>;

  constructor(private redirectService: RedirectService) {
    this.pageTitle = 'Redirect Urls';
  }

  ngOnInit(): void {
    this.redirects$ = this.redirectService.getRedirects();
  }

  editRow(redirectId: number) {
    this.selectedRedirectId = redirectId;
    this.modal.showModal();
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
