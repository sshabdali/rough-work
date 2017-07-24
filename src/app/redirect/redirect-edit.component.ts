import { Component, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { Redirect } from "app/model/Redirect";
import { RedirectService } from "app/services/redirect.service";
import { NgForm } from "@angular/forms/forms";

@Component({
  selector: 'redirect-edit',
  templateUrl: './redirect-edit.component.html',
  styleUrls: ['./redirect-edit.component.css']
})
export class RedirectEditComponent {

  redirectId = 0;
  @ViewChild('editModal') editModal;
  data: Redirect;

  constructor(private redirectService: RedirectService) {
  }

  showModal(redirectId: number) {
    this.redirectId = redirectId
    this.editModal.show();
  }

  public handler(id) {
    if (this.redirectId) {
      this.data = { ...this.redirectService.getRedirect(this.redirectId) };
    }
    else {
      this.data = this.redirectService.newObject();
    }
  }

  get expiryDate(): string {
    if (!this.data.expiry) {
      return "";
    }
    var date = new Date(<any>this.data.expiry);
    return date.toDateString().slice(4);
  }

  saveRedirect(form: NgForm) {
    this.redirectService.saveRedirect(form.value);
    form.resetForm();
    this.editModal.hide();
  }

  cancel(form: NgForm) {
    form.resetForm();
    this.editModal.hide();
  }
}