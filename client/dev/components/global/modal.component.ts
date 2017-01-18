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

    constructor() {
    }

    save() {
        this.onSaved.emit(true);
        $(this.modal.nativeElement).modal('hide');
    }

    showModal() {
        $(this.modal.nativeElement).modal();
    }
}
