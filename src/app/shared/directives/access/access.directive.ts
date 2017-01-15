// tslint:disable:directive-selector-prefix
// tslint:disable:directive-selector-name

import { Directive, ViewContainerRef, Input, TemplateRef } from '@angular/core';

import { PermissionService } from './../../../core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: ` [access],

                [accessReadApplications],
                [accessEditApplications],

                [accessReadConferences],
                [accessEditConferences],

                [accessReadForms],
                [accessEditForms],

                [accessAdmin],

                [accessReadRoles],
                [accessEditRoles],

                [accessReadUsers],
                [accessEditUsers],

                [accessReadPermissions],
                [accessEditPermissions]
                `
})
export class AccessDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permission: PermissionService
    ) { }

    @Input() set access(i) { this.restrictVisibility(['ReadApplications', 'ReadForms', 'ReadConferences'], true); }

    @Input() set accessReadApplications(i) { this.restrictVisibility('ReadApplications'); }
    @Input() set accessEditApplications(i) { this.restrictVisibility('EditApplications'); }

    @Input() set accessReadConferences(i) { this.restrictVisibility('ReadConferences'); }
    @Input() set accessEditConferences(i) { this.restrictVisibility('EditConferences'); }

    @Input() set accessReadForms(i) { this.restrictVisibility('ReadForms'); }
    @Input() set accessEditForms(i) { this.restrictVisibility('EditForms'); }

    @Input() set accessAdmin(i) { this.restrictVisibility(['ReadRoles', 'ReadPermissions', 'ReadUsers'], true); }

    @Input() set accessReadRoles(i) { this.restrictVisibility('ReadRoles'); }
    @Input() set accessEditRoles(i) { this.restrictVisibility('EditRoles'); }

    @Input() set accessReadUsers(i) { this.restrictVisibility('ReadUsers'); }
    @Input() set accessEditUsers(i) { this.restrictVisibility('EditUsers'); }

    @Input() set accessReadPermissions(i) { this.restrictVisibility('ReadPermissions'); }
    @Input() set accessEditPermissions(i) { this.restrictVisibility('EditPermissions'); }

    private restrictVisibility(permission: string | string[], or = false) {
        if (this.permission.hasPermission(permission, or)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
