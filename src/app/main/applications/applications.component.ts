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
                state: State.NameEnum.created,
                created: 20160731,
                form: {
                    title: 'Bachelorarbeit'
                }
            },
            {
                id: 2,
                state: State.NameEnum.submitted,
                created: 20160731,
                form: {
                    title: 'Masterarbeit'
                }
            },
            {
                id: 3,
                state: State.NameEnum.rescinded,
                created: 20160731,
                form: {
                    title: 'Notenanrechnung'
                }
            },
            {
                id: 4,
                state: State.NameEnum.deactivated,
                created: 20160731,
                form: {
                    title: 'Notenänderung'
                }
            },
            {
                id: 5,
                state: State.NameEnum.pending,
                created: 20160731,
                form: {
                    title: 'Anrechnung der Ausbildung'
                }
            },
            {
                id: 6,
                state: State.NameEnum.accepted,
                created: 20160731,
                modified: 20161120,
                form: {
                    title: 'Anrechnung von Studienfächern'
                }
            },
            {
                id: 7,
                state: State.NameEnum.denied,
                created: 20160731,
                modified: 20161120,
                form: {
                    title: 'Urlaubssemester'
                }
            }
        ]
    }

    save(event) {

    }

    cancel(event) {

    }
}
