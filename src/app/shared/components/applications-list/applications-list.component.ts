import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

/** Models */
import {
    ApplicationDetailDto,
    UserDetailDto,
    Status
} from './../../../swagger';

@Component({
    selector: 'pk-applications-list',
    templateUrl: './applications-list.component.html'
})
export class ApplicationsListComponent implements OnInit {

    @Input() applications: ApplicationDetailDto[];
    @Input() user: UserDetailDto;

    public itemsPerPage = 10;
    public page = 1;
    public hasNextPage = false;
    public list: ApplicationDetailDto[];

    private status = Status;

    constructor() { }

    ngOnInit() {
        this.paginate();
    }

    private paginate() {
        const start = this.itemsPerPage * (this.page - 1);
        if (this.applications.length >= start) {
            this.list = this.applications.slice(start, start + this.itemsPerPage);
            this.hasNextPage = this.applications.length >= start + this.itemsPerPage;
        } else {
            this.list = this.applications;
            this.hasNextPage = false;
        }
    }

    public nextPage(): void {
        this.page += 1;
        this.paginate();
    }

    public previousPage(): void {
        this.page -= 1;
        this.paginate();
    }

    public goToPage(page: number): void {
        this.page = page;
        this.paginate();
    }
}

@Component({
    selector: 'pk-applications-list-owned',
    templateUrl: './applications-list-owned.component.html'
})
export class ApplicationsListOwnedComponent extends ApplicationsListComponent {

}

@Component({
    selector: 'pk-applications-list-assigned',
    templateUrl: './applications-list-assigned.component.html'
})
export class ApplicationsListAssignedComponent extends ApplicationsListComponent {

}
