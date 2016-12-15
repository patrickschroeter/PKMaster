// tslint:disable:directive-selector-prefix
// tslint:disable:directive-selector-name

import { Directive, ViewContainerRef, Input, TemplateRef } from '@angular/core';

import { AuthenticationService } from './../../../core';

@Directive({
    selector: `[accessReadApplications], [accessCreateApplications], [accessReadForms], [accessCreateForms], [accessReadPermissions]`
})
export class AccessDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authentication: AuthenticationService
    ) { }

    @Input() set accessReadApplications(i) { this.restrictVisibility('ReadApplications'); }
    @Input() set accessCreateApplications(i) { this.restrictVisibility('CreateApplications'); }

    @Input() set accessReadForms(i) { this.restrictVisibility('ReadForms'); }
    @Input() set accessCreateForms(i) { this.restrictVisibility('CreateForms'); }

    @Input() set accessReadPermissions(i) { this.restrictVisibility('ReadPermissions'); }

    private restrictVisibility(permission: string) {
        this.authentication.getUser().subscribe(user => {
            if (user && user.permissions && user.permissions.indexOf(permission) !== -1) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }
}
