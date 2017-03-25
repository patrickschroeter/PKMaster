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

import { Directive, HostListener, Input, HostBinding, OnInit } from '@angular/core';

import { ListService } from 'app/shared/services';

/**
 * SortDirective
 *
 * @export
 * @class SortDirective
 * @implements {OnInit}
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[sort]'
})
export class SortDirective implements OnInit {

    @HostBinding('class.list-element--sorting') isActive = false;

    @Input() sort: string;

    @HostListener('click', ['$event']) onClick() {
        this.listService.sortBy(this.sort);
    }

    /**
     * Creates an instance of SortDirective.
     * @param {ListService} listService
     *
     * @memberOf SortDirective
     */
    constructor(
        private listService: ListService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf SortDirective
     */
    ngOnInit() {
        this.listService.sortValue.subscribe((result: string) => {
            this.isActive = this.sort === result;
        });
    }
}
