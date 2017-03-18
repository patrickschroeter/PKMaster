import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class PaginationService {

    private original: any[];

    private _list: any[] = [];
    private _page = 1;

    private _itemsPerPage = 13;
    private _hasNextPage = 0;

    public list: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this._list);
    public page: BehaviorSubject<number> = new BehaviorSubject<number>(this._page);
    public itemsPerPage: BehaviorSubject<number> = new BehaviorSubject<number>(this._itemsPerPage);
    public hasNextPage: BehaviorSubject<number> = new BehaviorSubject<number>(this._hasNextPage);

    constructor() { }

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
        const start = this._itemsPerPage * (this._page - 1);
        if (this.original.length >= start) {
            this._list = this.original.slice(start, start + this._itemsPerPage);
            let rest = this.original.length - (start + this._itemsPerPage);
            rest = rest > -1 ? rest : 0;

            this._hasNextPage = rest / this._itemsPerPage;
        } else {
            this._list = this.original;

            this._hasNextPage = 0;
        }

        this.hasNextPage.next(this._hasNextPage);
        this.page.next(this._page);
        this.list.next(this._list);
        this.itemsPerPage.next(this._itemsPerPage);
    }

}
