import { Component, OnInit } from '@angular/core';

import { Application, State } from './../../swagger';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

    private applications: Application[];

    constructor() { }

    ngOnInit() {
        this.applications = [
            {
                id: 1,
                state: State.NameEnum.available,
                created: 20160731,
                form: {
                    title: 'Antrag auf Masterarbeit'
                }
            },
            {
                id: 2,
                state: State.NameEnum.available,
                created: 20160731,
                form: {
                    title: 'Antrag auf Notenanrechnung'
                }
            }
        ]
    }

    save(event) {

    }

    cancel(event) {

    }
}
