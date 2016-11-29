import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    constructor() { }

    ngOnInit() {
    }

}
