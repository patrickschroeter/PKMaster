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

import { Component, OnInit } from '@angular/core';

import { ListService } from './../../services';
import { Status } from 'app/swagger';

/**
 * FilterComponent
 *
 * @export
 * @class FilterComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    public filter: Status[];

    public status = Status;

    /**
     * Creates an instance of FilterComponent.
     * @param {ListService} listService
     *
     * @memberOf FilterComponent
     */
    constructor(
        private listService: ListService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf FilterComponent
     */
    ngOnInit() {
        this.listService.filter.subscribe((result: Status[]) => {
            this.filter = result;
        });
    }

    /**
     * filter list by status
     *
     * @param {...Status[]} status
     *
     * @memberOf FilterComponent
     */
    public filterList(...status: Status[]) {
        this.listService.toggleFilter(status);
    }

}
