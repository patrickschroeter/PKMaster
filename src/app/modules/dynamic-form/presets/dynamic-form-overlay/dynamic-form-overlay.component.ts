import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/** Models */
import { FieldDto, ConferenceDto } from './../../../../swagger';

/**
 * A wrapper for an Dynamic Form in Overlay
 *
 * @export
 * @class DynamicFormOverlayComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-dynamic-form-overlay',
    templateUrl: './dynamic-form-overlay.component.html'
})
export class DynamicFormOverlayComponent implements OnInit {

    /**
     * the form config
     *
     * @type {FieldDto[]}
     * @memberOf DynamicFormOverlayComponent
     */
    @Input() form: FieldDto[];

    /**
     * the save event emitter
     *
     * @type {EventEmitter<any>}
     * @memberOf DynamicFormOverlayComponent
     */
    @Output() save: EventEmitter<any> = new EventEmitter();

    /**
     * Creates an instance of DynamicFormOverlayComponent.
     *
     * @memberOf DynamicFormOverlayComponent
     */
    constructor() { }

    /**
     * implements OnInit
     *
     * @memberOf DynamicFormOverlayComponent
     */
    ngOnInit() {
    }

    /**
     * emits the value of the form
     *
     * @param {any} value
     *
     * @memberOf DynamicFormOverlayComponent
     */
    public submit(value: any) {
        this.save.emit(value);
    }

}
