import { Component, OnInit } from '@angular/core';

import { ListService } from './../../services';
import { Status } from './../../../swagger';

@Component({
    selector: 'pk-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    public filter: Status[];

    public status = Status;

    constructor(
        private listService: ListService
    ) { }

    ngOnInit() {
        this.listService.filter.subscribe((result: Status[]) => {
            this.filter = result;
        });
    }

    public filterList(...status: Status[]) {
        this.listService.toggleFilter(status);
    }

}
