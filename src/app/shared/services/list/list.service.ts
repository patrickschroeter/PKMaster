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

import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { BehaviorSubject } from 'rxjs/Rx';

import { Status, ApplicationListDto } from 'app/swagger';

/**
 * List<T>
 *
 * @export
 * @class List
 * @template T
 */
export class List<T> {
    public list: T[];

    constructor(
        public listService: ListService
    ) {}

    public initListDependencies(list: T[]): void {
        this.listService.setOriginalList(list).subscribe((result: T[]) => {
            this.list = result;
        });
    }
}

/**
 * ListService
 *
 * @export
 * @class ListService
 */
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

    private _sortValue: string;
    private _sortDirection = 1;

    public sortValue: BehaviorSubject<string> = new BehaviorSubject<string>(this._sortValue);
    public sortDirection: BehaviorSubject<number> = new BehaviorSubject<number>(this._sortDirection);

    /**
     * Creates an instance of ListService.
     *
     * @memberOf ListService
     */
    constructor() { }

    /**
     * toggle the filter of the list
     *
     * @param {Status[]} status
     *
     * @memberOf ListService
     */
    public toggleFilter(status: Status[]): void {
        if (!status || !status.length) {
            this._filter = [];
        } else {
            this._filter = status;
            // for (const filter of status) {
            //     const index = _.findIndex(this._filter, obj => obj === filter);
            //     if (index > -1) {
            //         this._filter.splice(index, 1);
            //     } else {
            //         this._filter.push(filter);
            //     }
            // }
        }
        this.filter.next(this._filter);
        this.goToPage(1);
    }

    /**
     * sort the array by primary attribute
     *
     * @param {string} key
     *
     * @memberOf ListService
     */
    public sortBy(key: string): void {
        if (this._sortValue === key) {
            this._sortDirection *= -1;
        }

        this._sortValue = key;
        this.sortValue.next(this._sortValue);
        this.sortDirection.next(this._sortDirection);
        this.paginate();
    }

    /**
     * set the original list and paginate the first time
     *
     * @param {any[]} list
     *
     * @memberOf PaginationService
     */
    public setOriginalList(list: any[]): BehaviorSubject<any> {
        this.original = _.cloneDeep(list) || [];
        this.paginate();
        return this.list;
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

        /** Filter List */
        if (this._filter.length > 0) {
            for (const status of this._filter) {
                // Filter ApplicationListDto
                original = original.filter((obj: ApplicationListDto) => this._filter.indexOf(obj.statusId) !== -1);
            }
        }

        /** Sort List */
        if (this._sortValue) {
            const keys: string[] = this._sortValue.split('.');
            original = original.sort((a: any, b: any) => {
                const valueA = this.getValue(a, keys);
                const valueB = this.getValue(b, keys);
                if (valueA > valueB || typeof valueA === 'undefined') {
                    return this._sortDirection;
                } else if (valueA < valueB || typeof valueB === 'undefined') {
                    return this._sortDirection * -1;
                } else {
                    return 0;
                }
            });

        }

        /** Paginate List */
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

    /**
     * get the value of the object by keys[]
     *
     * @private
     * @param {*} obj
     * @param {string[]} keys
     * @returns {*}
     *
     * @memberOf ListService
     */
    private getValue(obj: any, keys: string[]): any {
        let value: any = obj;
        for (const key of keys) {
            if (typeof value[key] === 'undefined') {
                return undefined;
            }
            value = value[key];
        }
        return value;
    }
}
