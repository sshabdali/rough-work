import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface ModalOption {
    component: Type<any>
    data: any
}

@Injectable()
export class DialogService {

    private modalOptionSubject: BehaviorSubject<ModalOption>;
    public modalOption$: Observable<ModalOption>

    constructor() {
        this.modalOptionSubject = <BehaviorSubject<ModalOption>>new BehaviorSubject(undefined);
        this.modalOption$ = this.modalOptionSubject.asObservable();
    }

    showConfirm: (title?: string, message?: string, okText?: string, cancelText?: string, okClass?: string) => Promise<boolean>;

    showModal(modalOption: ModalOption) {
        this.modalOptionSubject.next(modalOption);
    }

}

