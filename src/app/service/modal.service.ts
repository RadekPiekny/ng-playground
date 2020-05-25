import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    state: boolean;
    subject = new Subject<ModalData>();
    provider = this.subject.asObservable();

    constructor() { }

    open(message: string, callBackFn?: Function) {
        this.state = true;
        let modalData: ModalData = new ModalData;
        modalData.message = message;
        modalData.callBackFn = callBackFn;
        this.subject.next(modalData);
    }

    close() {
        this.state = false;
    }
}

class ModalData {
    message: string;
    callBackFn: Function;
}