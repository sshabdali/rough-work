import { Component, OnInit, ViewChild } from '@angular/core';
import { RedirectService } from "../services/redirect.service";
import { Observable } from "rxjs/Observable";
import { Redirect } from "model/Redirect";
import { DialogService } from "../common/dialog.service";
import { RedirectEditComponent } from "./redirect-edit.component";


@Component({
  selector: 'redirect-list',
  templateUrl: './redirect-list.component.html',
  styleUrls: ['./redirect-list.component.css']
})
export class RedirectListComponent implements OnInit {

  public currentPage: number = 1;

  sortKey = "";
  sortOrder = "";
  redirects$: Observable<Redirect[]>;
  totalItems$: Observable<number>;
  pageLabel$: Observable<string>;

  constructor(private redirectService: RedirectService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.loadPage(1);
    this.redirects$ = this.redirectService.redirects$;
    this.totalItems$ = this.redirectService.totalItems$;
    this.pageLabel$ = this.redirectService.pageLabel$;
  }

  showEditModel(id: string) {

    this.dialogService.showModal({
      component: RedirectEditComponent,
      data: { id: id }
    })

  }

  showDeleteModel(id: string) {

    this.dialogService.showConfirm("Delete confirmation", "Are you sure you want to delete this record?", "Delete", "Cancel", "btn-danger")
      .then(res => {
        if (res) {
          this.redirectService.remove(id).subscribe(response => {
            this.loadPage(this.currentPage);
          });
        }
      });

  }

  showResetModel(id: string) {

    this.dialogService.showConfirm("Confirm Reset Count", "Are you sure you want to reset the redirect count?", "Reset", "Cancel", "btn-warning")
      .then(res => {
        if (res) {
          this.redirectService.reset(id);
        }
      });
  }

  sortby(key: string) {
    if (this.sortKey != key) {
      this.sortOrder = 'DESC'
    }
    else {
      this.sortOrder = this.sortOrder == 'ASC' ? 'DESC' : 'ASC'
    }
    this.sortKey = key;
    this.loadPage(this.currentPage);
  }

  loadPage(pageNo: number) {
    this.redirectService.load(pageNo, this.sortKey, this.sortOrder);
  }

  public pageChanged(event: any): void {
    this.loadPage(event.page);
  }
}