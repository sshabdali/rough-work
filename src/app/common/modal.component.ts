import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';

import { HostDirective } from './host.directive';
import { DialogService, ModalOption } from "../common/dialog.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'modal-form',
    template: `
                <div class="modal fade" bsModal #editModal="bs-modal" [config]="{backdrop: 'static'}" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog  modal-lg">
                <div class="modal-content">
                    <ng-template host-modal></ng-template>
                </div>
                </div>
                </div>    
            `
})

export class ModalComponent implements OnInit {

    modalOption$: Observable<ModalOption>;
    @ViewChild('editModal') editModal;
    @ViewChild(HostDirective) adHost: HostDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private dialogService: DialogService) { }

    ngOnInit() {

        this.dialogService.modalOption$.subscribe(opt => {
            if (opt !== undefined) {
                let componentFactory = this.componentFactoryResolver.resolveComponentFactory(opt.component);

                let viewContainerRef = this.adHost.viewContainerRef;
                viewContainerRef.clear();

                let componentRef = viewContainerRef.createComponent(componentFactory);
                (<any>componentRef.instance).options = opt.data;
                (<any>componentRef.instance).modalRef = this.editModal;

                this.editModal.show();
            }
        });
    }
}