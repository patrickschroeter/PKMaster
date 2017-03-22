import { Directive, HostListener, Input, HostBinding, OnInit } from '@angular/core';

import { ListService } from 'app/shared/services';

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

    constructor(
        private listService: ListService
    ) { }

    ngOnInit() {
        this.listService.sortValue.subscribe((result: string) => {
            this.isActive = this.sort === result;
        });
    }
}
