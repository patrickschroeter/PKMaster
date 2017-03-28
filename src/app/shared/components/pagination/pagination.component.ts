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

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { ListService } from './../../services';

/**
 * PaginationComponent
 *
 * @export
 * @class PaginationComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    exportAs: 'pagination'
})
export class PaginationComponent implements OnInit {

    @Input() list: any[];

    @Output() change: EventEmitter<any[]> = new EventEmitter<any[]>();

    public itemsPerPage: number;
    public page: number;
    public hasNextPage: number;

    /**
     * Creates an instance of PaginationComponent.
     * @param {ListService} pagination
     *
     * @memberOf PaginationComponent
     */
    constructor(
        private pagination: ListService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf PaginationComponent
     */
    ngOnInit() {
        this.pagination.itemsPerPage.subscribe((result: number) => {
            this.itemsPerPage = result;
        });
        this.pagination.page.subscribe((result: number) => {
            this.page = result;
        });
        this.pagination.hasNextPage.subscribe((result: number) => {
            this.hasNextPage = result;
        });
    }

    /**
     * go to next page of pagination
     *
     * @memberOf PaginationComponent
     */
    public nextPage(): void {
        this.pagination.nextPage();
    }

    /**
     * go to previous page of pagination
     *
     * @memberOf PaginationComponent
     */
    public previousPage(): void {
        this.pagination.previousPage();
    }

    /**
     * to go given page
     *
     * @param {number} page
     *
     * @memberOf PaginationComponent
     */
    public goToPage(page: number): void {
        this.pagination.goToPage(page);
    }

}
