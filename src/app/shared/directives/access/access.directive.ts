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

    @Input() set access(i) { this.restrictVisibility(['ReadApplications', 'ReadForms', 'ReadConferences'], i, true); }

    @Input() set accessReadApplications(i) { this.restrictVisibility('ReadApplications', i); }
    @Input() set accessEditApplications(i) { this.restrictVisibility('EditApplications', i); }

    @Input() set accessReadConferences(i) { this.restrictVisibility('ReadConferences', i); }
    @Input() set accessEditConferences(i) { this.restrictVisibility('EditConferences', i); }

    @Input() set accessReadForms(i) { this.restrictVisibility('ReadForms', i); }
    @Input() set accessEditForms(i) { this.restrictVisibility('EditForms', i); }

    @Input() set accessAdmin(i) { this.restrictVisibility(['ReadRoles', 'ReadPermissions', 'ReadUsers'], i, true); }

    @Input() set accessReadRoles(i) { this.restrictVisibility('ReadRoles', i); }
    @Input() set accessEditRoles(i) { this.restrictVisibility('EditRoles', i); }

    @Input() set accessReadUsers(i) { this.restrictVisibility('ReadUsers', i); }
    @Input() set accessEditUsers(i) { this.restrictVisibility('EditUsers', i); }

    @Input() set accessReadPermissions(i) { this.restrictVisibility('ReadPermissions', i); }
    @Input() set accessEditPermissions(i) { this.restrictVisibility('EditPermissions', i); }

    private restrictVisibility(permission: string | string[], param, or = false) {
        let access = this.permission.hasPermission(permission, or);
        if ( (access && !param) || (!access && !!param) ) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
