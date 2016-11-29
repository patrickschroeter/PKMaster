import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'pk-admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    constructor() { }

    ngOnInit() {
    }

}
