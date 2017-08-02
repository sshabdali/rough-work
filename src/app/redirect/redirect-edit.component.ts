import { Component, ViewChild, Input } from '@angular/core';
import { RedirectService } from "app/services/redirect.service";
import { NgForm } from "@angular/forms/forms";
import { Redirect } from "model/Redirect";
import { Observable } from "rxjs/Observable";

@Component({
  templateUrl: './redirect-edit.component.html',
  styleUrls: ['./redirect-edit.component.css']
})
export class RedirectEditComponent {

  @Input() options: any;
  @Input() modalRef: any;

  redirectId = "";
  dateToDisplay = "";
  errorMessage = "";
  showDatePicker = false;
  isAddNewMode = false;

  data: Redirect;
  
  constructor(private redirectService: RedirectService) {
  }

  ngOnInit(): void {
    this.errorMessage = "";
    this.redirectId = this.options.id;

    if (this.redirectId) {
      this.redirectService.get(this.redirectId)
        .subscribe(result => {
          this.data = result;
          this.dateToDisplay = this.data.expiry
          this.isAddNewMode = false
        });
    }
    else {
      this.data = this.redirectService.newObject();
      this.isAddNewMode = true
    }
  }

  saveRedirect(form: NgForm) {

    if (this.isAddNewMode) {
      this.redirectService.create(form.value)
        .subscribe(response => {
          this.redirectService.load(1, '', '');
          form.resetForm();
          this.modalRef.hide();
        }, err => this.errorMessage = err.json().error);

    } else {
      this.redirectService.update(form.value);
      form.resetForm();
      this.modalRef.hide();
    }
    
  }

  cancel(form: NgForm) {
    form.resetForm();
    this.modalRef.hide();
  }

  onExpirySelection(data) {
    this.showDatePicker = false;
    this.dateToDisplay = new Date(<any>data).toDateString().slice(4);
  }
}