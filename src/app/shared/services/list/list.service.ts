import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/Rx';

import { Status, ApplicationListDto } from './../../../swagger';

@Injectable()
export class ListService {

    private original: any[];

    private _list: any[] = [];
    private _page = 1;

    private _itemsPerPage = 13;
    private _hasNextPage = 0;

    public list: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this._list);
    public page: BehaviorSubject<number> = new BehaviorSubject<number>(this._page);
    public itemsPerPage: BehaviorSubject<number> = new BehaviorSubject<number>(this._itemsPerPage);
    public hasNextPage: BehaviorSubject<number> = new BehaviorSubject<number>(this._hasNextPage);

    private _filter: Status[] = [];

    public filter: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>(this._list);

    constructor() { }

    public toggleFilter(status: Status[]) {
        if (!status || !status.length) {
            this._filter = [];
        } else {
            for (const filter of status) {
                const index = _.findIndex(this._filter, obj => obj === filter);
                if (index > -1) {
                    this._filter.splice(index, 1);
                } else {
                    this._filter.push(filter);
                }
            }
        }
        this.filter.next(this._filter);
        this.paginate();
    }

    /**
     * set the original list and paginate the first time
     *
     * @param {any[]} list
     *
     * @memberOf PaginationService
     */
    public setOriginalList(list: any[]): void {
        this.original = list || [];
        this.paginate();
    }

    /**
     * go to next page of pagination
     *
     * @memberOf PaginationComponent
     */
    public nextPage(): void {
        if (!this._hasNextPage) { return; }
        this._page += 1;
        this.paginate();
    }

    /**
     * go to previous page of pagination
     *
     * @memberOf PaginationComponent
     */
    public previousPage(): void {
        if (this._page <= 1) { return; }
        this._page -= 1;
        this.paginate();
    }

    /**
     * to go given page
     *
     * @param {number} page
     *
     * @memberOf PaginationComponent
     */
    public goToPage(page: number): void {
        if (page < 1) { return; }
        this._page = page;
        this.paginate();
    }

    /**
     * format list to fit pagination
     *
     * @private
     *
     * @memberOf PaginationComponent
     */
    private paginate() {
        let original: any[] = this.original;

        if (this._filter.length > 0) {
            for (const status of this._filter) {
                // Filter ApplicationListDto
                original = original.filter((obj: ApplicationListDto) => this._filter.indexOf(obj.statusId) !== -1);
            }
        }

        const start = this._itemsPerPage * (this._page - 1);
        if (original.length >= start) {
            this._list = original.slice(start, start + this._itemsPerPage);
            let rest = original.length - (start + this._itemsPerPage);
            rest = rest > -1 ? rest : 0;

            this._hasNextPage = rest / this._itemsPerPage;
        } else {
            this._list = original;

            this._hasNextPage = 0;
        }

        this.hasNextPage.next(this._hasNextPage);
        this.page.next(this._page);
        this.list.next(this._list);
        this.itemsPerPage.next(this._itemsPerPage);
    }

}
