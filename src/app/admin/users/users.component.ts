import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    constructor() { }

    ngOnInit() {
    }

}
