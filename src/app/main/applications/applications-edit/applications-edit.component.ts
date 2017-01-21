import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ApplicationService } from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

import { Application } from './../../../swagger';

@Component({
    selector: 'pk-applications-edit',
    templateUrl: './applications-edit.component.html',
    styleUrls: ['./applications-edit.component.scss']
})
export class ApplicationsEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _application: Application;

    get application() { return this._application; }
    set application(application: Application) { this._application = application; }

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private applicationService: ApplicationService,
        private alert: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {

        /** Read Route Param and GET Application with param ID */
        this.activatedRoute.params.forEach((params: Params) => {
            this.applicationService.getApplicationById(params['id']).subscribe((application) => {
                // TODO catch in service
                if (!application) {
                    return this.onError(params['id']);
                } else if ( application.status && ['rescinded', 'created'].indexOf(application.status.name) === -1) {
                    this.router.navigate(['/applications']);
                    this.alert.setErrorHint('no-application-edit', this.translationService.translate('errorApplicationEditPermitted'), 2000);
                    return;
                }
                this.application = application;
            }, error => {
                console.error(error);
                return this.onError(params['id']);
            });
        });
    }

    private onError(id: string) {
        this.router.navigate(['/applications']);
        this.alert.setErrorHint('no-application-found', this.translationService.translate('errorNoApplicationWithId', [id]), 2000);
    }

    saveApplication(form) {
        this.applicationService.saveApplication(form).subscribe(result => {
            this.router.navigate([`/applications/`, result.id]);
        });
    }

    submitApplication(application: Application) {
        this.applicationService.submitApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`submitApplication${application.id}`, this.translationService.translate('applicationSubmitted'));
            this.router.navigate([`/applications/`, result.id]);
        });
    }

    deactivateApplication(application: Application) {
        this.applicationService.deactivateApplication(application).subscribe(result => {
            this.alert.setSuccessHint(`deactivateApplication${application.id}`, this.translationService.translate('applicationDeactivated'));
            this.router.navigate([`/applications/`, result.id]);
        });
    }

}
