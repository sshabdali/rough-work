import { Component, OnChanges, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { Redirect } from "app/model/Redirect";
import { RedirectService } from "app/services/redirect.service";

@Component({
  selector: 'redirect-edit',
  templateUrl: './redirect-edit.component.html',
  styleUrls: ['./redirect-edit.component.css']
})
export class RedirectEditComponent implements OnChanges {

  @Input() redirectId = 0;
  @ViewChild('staticModal') modalForm;

  data: Redirect;

  constructor(private redirectService: RedirectService) {
  }

  ngOnChanges() {
    if (this.redirectId) {
      this.data = this.redirectService.getRedirect(this.redirectId);
    }
    else {
      this.data = {
        "redirectId": 0,
        "redirectCount": 0,
        "source": "",
        "destination": "",
        "expiry": "",
        "lastSeen": ""
      }
    }
  }

  showModal(modalBody: string) {
    this.modalForm.show();
  }

  saveRedirect(formValues) {
    this.redirectService.saveRedirect(formValues);
    this.modalForm.hide();
  }

  cancel() {
    this.modalForm.hide();
  }
}