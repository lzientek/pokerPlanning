/**
 * Created by Lzientek on 01-10-2016
 */
declare var $: JQueryStatic;
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-modal',
    templateUrl: './components/global/modal.component.html',
    styleUrls: ['./styles/global/modal.component.css']
})

export class ModalComponent {
    @Input() title: string = '';
    @Input() saveText: string = 'Save';
    @ViewChild('modal') modal: ElementRef;
    @Output() onSaved = new EventEmitter<boolean>();

    private _options: ModalOptions;

    constructor() {
        this._options = {display: { header: true, footer: true }};
    }

//setter
    @Input()
    set options(options: ModalOptions){
        if (options) {
            this._options = options;
        } else {
            throw new Error("Invalid value for ModalOptions");
        }
    }

//methods
    save() {
        this.onSaved.emit(true);
        $(this.modal.nativeElement).modal('hide');
    }

    showModal() {
        $(this.modal.nativeElement).modal();
    }
}

export interface ModalOptions {
    display: {
        header: boolean,
        footer: boolean,
    };
};