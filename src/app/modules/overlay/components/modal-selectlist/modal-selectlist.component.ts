/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

import { Component, OnInit, ViewChild, Injector } from '@angular/core';

import { OverlayComponent } from './..';

import { Selectable } from 'app/models';

/**
 * ModalSelectlistComponent
 *
 * @export
 * @class ModalSelectlistComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-modal-selectlist',
    templateUrl: './modal-selectlist.component.html',
    styleUrls: ['./modal-selectlist.component.scss']
})
export class ModalSelectlistComponent implements OnInit {

    @ViewChild('overlay') overlay: OverlayComponent;

    public title: string;
    public list: Selectable[];

    public isFluid: boolean;

    public click: Function;

    public emptyText: string;

    public redirect: Function;
    public redirectText: string;
    public redirectFn: Function;

    public selectedValue: string;
    public selectedValues?: string;

    public searchstring: string;
    public filteredOptions: Array<Selectable>;

    /**
     * Creates an instance of ModalSelectlistComponent.
     * @param {Injector} injector
     *
     * @memberOf ModalSelectlistComponent
     */
    constructor(private injector: Injector) {
        this.title = this.injector.get('title');
        this.list = this.injector.get('list');
        this.click = this.injector.get('click');
        this.isFluid = !!this.injector.get('isFluid');

        this.emptyText = this.injector.get('emptyText');
        this.redirect = this.injector.get('redirect');
        this.redirectText = this.injector.get('redirectText');
        this.redirectFn = this.injector.get('redirectFn');

        this.selectedValue = this.injector.get('selectedValue');
        this.selectedValues = this.injector.get('selectedValues');
    }

    /**
     * implements OnInit
     *
     * @memberOf ModalSelectlistComponent
     */
    ngOnInit() {
        if (this.overlay instanceof OverlayComponent) {
            this.overlay.toggle(true);
        }
    }

    /**
     * Filteres the original list by searchstring
     *
     * @param {string} event
     * @returns {void}
     *
     * @memberOf ModalSelectlistComponent
     */
    public filterOptions(event: string): void {
        if (!this.list) { return; }
        if (!event || event === '') {
            this.filteredOptions = undefined;
            return;
        }
        this.filteredOptions = [];
        for (let i = 0; i < this.list.length; i++) {
            const element = this.list[i];
            if (element.value.toLowerCase().includes(event.toLowerCase()) ||
                element.label.toLowerCase().includes(event.toLowerCase())) {
                this.filteredOptions.push(element);
            }
        }
    }

}
