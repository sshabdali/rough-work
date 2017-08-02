import { OnInit, Component, ViewChild } from '@angular/core';
import { DialogService } from "./dialog.service";

@Component({
    selector: 'modal-confirm',
    templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {

    @ViewChild('confirmModal') _confirmModal;

    private _defaults = {
        title: 'Confirmation',
        message: 'Do you want to cancel your changes?',
        okText: 'OK',
        cancelText: 'Cancel',
        okClass: 'btn-primary'
    };
    title: string;
    message: string;
    okText: string;
    cancelText: string;
    okClass: string;

    private _closeButton: any;
    private _cancelButton: any;
    private _okButton: any;

    constructor(dialogService: DialogService) {
        dialogService.showConfirm = this.activate.bind(this);
    }

    _setLabels(title, message, okText, cancelText, okClass) {

        this.title = title;
        this.message = message;
        this.okText = okText;
        this.cancelText = cancelText;
        this.okClass = okClass;
    }

    activate(title = this._defaults.title, message = this._defaults.message,
        okText = this._defaults.okText, cancelText = this._defaults.cancelText, okClass = this._defaults.okClass) {

        this._setLabels(title, message, okText, cancelText, okClass);

        let promise = new Promise<boolean>(resolve => {
            this._show(resolve);
        });
        return promise;
    }

    private _show(resolve: (boolean) => any) {

        let negativeOnClick = (e: any) => resolve(false);
        let positiveOnClick = (e: any) => resolve(true);

        if (!this._confirmModal || !this._cancelButton || !this._okButton) return;

        this._confirmModal.show();

        this._closeButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!negativeOnClick(e)) this._hideDialog();
        })

        this._cancelButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!negativeOnClick(e)) this._hideDialog();
        })

        this._okButton.onclick = ((e: any) => {
            e.preventDefault();
            if (!positiveOnClick(e)) this._hideDialog()
        });
    }

    private _hideDialog() {
        this._confirmModal.hide();
    }

    ngOnInit(): any {
        this._closeButton = document.getElementById('closeButton');
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
    }
}