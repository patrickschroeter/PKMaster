import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApplicationService, AlertService } from './../../../core';
import { Application, State } from './../../../swagger';

@Component({
    selector: 'pk-applications-edit',
    templateUrl: './applications-edit.component.html',
    styleUrls: ['./applications-edit.component.scss']
})
export class ApplicationsEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private application: Application;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private alert: AlertService) { }

    ngOnInit() {

        /** Read Route Param and GET Application with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.applicationService.getApplicationById(+params['id']).subscribe((application) => {
                // TODO catch in service
                if (!application) {
                    this.router.navigate(['/applications']);
                    this.alert.setErrorHint('no-application-found', `The is no application with the requested Id: ${params['id']}`, 2000);
                    return;
                } else if ( application.state && [State.NameEnum.rescinded, State.NameEnum.created].indexOf(application.state) === -1) {
                    this.router.navigate(['/applications']);
                    this.alert.setErrorHint('no-application-edit', `It's not allowed to edit this application`, 2000);
                    return;
                }
                this.application = application;
            });
        });
    }

    saveApplication(form) {
        this.applicationService.saveApplication(form).subscribe(result => {
            this.router.navigate(['/applications']);
        });
    }

}
