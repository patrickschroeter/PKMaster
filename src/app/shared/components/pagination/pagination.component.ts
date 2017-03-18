import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { PaginationService } from './../../services';

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

    constructor(
        private pagination: PaginationService
    ) { }

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
