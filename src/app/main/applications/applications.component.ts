import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

/** Services */
import {
    ApplicationService,
    FormService,
    PermissionService,
    AuthenticationService
} from './../../core';
import { AlertService } from './../../modules/alert';
import { TranslationService } from './../../modules/translation';
import { ModalService } from './../../modules/overlay';

/** Models */
import {
    ApplicationDetailDto,
    ApplicationCreateDto,
    UserDetailDto
} from './../../swagger';
import { Selectable } from './../../models';

/** Decorators */
import { Access } from './../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public ownApplications: ApplicationDetailDto[];
    public assignedApplications: ApplicationDetailDto[];
    public applications: ApplicationDetailDto[];

    public activeTab: string;

    private applicationTypes: Array<Selectable>;

    public user: UserDetailDto;

    constructor(
        /** Angular */
        private router: Router,
        /** Modules */
        private alert: AlertService,
        private translationService: TranslationService,
        private modalService: ModalService,
        /** Services */
        private applicationService: ApplicationService,
        private formService: FormService,
        private permission: PermissionService,
        private auth: AuthenticationService
    ) { }

    ngOnInit() {

        /** get all forms */
        this.formService.getForms().subscribe(forms => {
            this.applicationTypes = [];
            for (let i = 0; i < forms.length; i++) {
                const element = forms[i];
                this.applicationTypes.push(new Selectable(element.id, element.title));
            }
        });

        // TODO remove when filtered on server
        this.auth.getUser().subscribe(user => {
            this.user = user;
            /** get applications */
            this.getApplications();
        });
    }

    private getApplications(): void {
        this.activeTab = 'owned';
        this.applicationService.getOwnApplications(null, this.user).subscribe(result => {
            this.ownApplications = result;
        });
        this.applicationService.getAssignedApplications(null, this.user).subscribe(result => {
            this.assignedApplications = result;
        });
        this.getAllApplications();
    }

    @Access('ReadApplications')
    private getAllApplications(): void {
        this.activeTab = 'all';
        this.applicationService.getApplications().subscribe(result => {
            this.applications = result;
        });
    }

    /**
     * Sort all applications by the sortValue string
     */
    public sortBy(sortValue: string): void {
        this.applicationService.getApplications(sortValue);
    }

    /**
     * Creates a list modal to select the form for the new application
     */
    @Access('CreateApplications')
    public createApplicationModal(): void {
        this.modalService.createListModal({
            title: this.translationService.translate('createNewApplication'),
            list: this.applicationTypes,
            click: this.createApplication.bind(this),
            isFluid: true,

            emptyText: this.translationService.translate('noFormsAvailable'),
            redirect: this.permission.hasPermission('ReadForms'),
            redirectText: this.translationService.translate('createNewForm'),
            redirectParam: ['forms']
        });
    }

    /**
     * Create a new application with the selected form
     */
    @Access('CreateApplications')
    private createApplication(listelement: Selectable): void {
        /** TODO */
        const param: ApplicationCreateDto = new ApplicationCreateDto();
        param.formId = listelement.value;
        this.applicationService.createNewApplication(param).subscribe((created: ApplicationDetailDto) => {
            if (created['id']) {
                this.router.navigate([`/applications/`, created['id'], 'edit']);
            }
            this.modalService.destroyModal();
        });
    }
}
