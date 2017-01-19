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

    @Input() set access(i: number) { this.restrictVisibility(['ReadApplications', 'ReadForms', 'ReadConferences'], i, true); }

    @Input() set accessReadApplications(i: number) { this.restrictVisibility('ReadApplications', i); }
    @Input() set accessEditApplications(i: number) { this.restrictVisibility('EditApplications', i); }

    @Input() set accessReadConferences(i: number) { this.restrictVisibility('ReadConferences', i); }
    @Input() set accessEditConferences(i: number) { this.restrictVisibility('EditConferences', i); }

    @Input() set accessReadForms(i: number) { this.restrictVisibility('ReadForms', i); }
    @Input() set accessEditForms(i: number) { this.restrictVisibility('EditForms', i); }

    @Input() set accessAdmin(i: number) { this.restrictVisibility(['ReadRoles', 'ReadPermissions', 'ReadUsers'], i, true); }

    @Input() set accessReadRoles(i: number) { this.restrictVisibility('ReadRoles', i); }
    @Input() set accessEditRoles(i: number) { this.restrictVisibility('EditRoles', i); }

    @Input() set accessReadUsers(i: number) { this.restrictVisibility('ReadUsers', i); }
    @Input() set accessEditUsers(i: number) { this.restrictVisibility('EditUsers', i); }

    @Input() set accessReadPermissions(i: number) { this.restrictVisibility('ReadPermissions', i); }
    @Input() set accessEditPermissions(i: number) { this.restrictVisibility('EditPermissions', i); }

    private restrictVisibility(permission: string | string[], param: number, or = false) {
        let access = this.permission.hasPermission(permission, or);
        if ( (access && !param) || (!access && !!param) ) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
