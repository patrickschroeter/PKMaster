// tslint:disable:directive-selector-prefix
// tslint:disable:directive-selector-name

import { Directive, ViewContainerRef, Input, TemplateRef } from '@angular/core';

import { PermissionService } from './../../../core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: `[accessReadApplications], [accessCreateApplications], [accessReadForms], [accessCreateForms], [accessReadPermissions]`
})
export class AccessDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permission: PermissionService
    ) { }

    @Input() set accessReadApplications(i) { this.restrictVisibility('ReadApplications'); }
    @Input() set accessCreateApplications(i) { this.restrictVisibility('CreateApplications'); }

    @Input() set accessReadForms(i) { this.restrictVisibility('ReadForms'); }
    @Input() set accessCreateForms(i) { this.restrictVisibility('CreateForms'); }

    @Input() set accessReadPermissions(i) { this.restrictVisibility('ReadPermissions'); }

    private restrictVisibility(permission: string) {
        if (this.permission.hasPermission(permission)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
