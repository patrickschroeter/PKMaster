/**
 *
 * @author Patrick Schröter <patrick.schroeter@hotmail.de>
 *
 * @license CreativeCommons BY-NC-SA 4.0 2017
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.
 *
 */

// tslint:disable:directive-selector-prefix
// tslint:disable:directive-selector-name
import { Directive, ViewContainerRef, Input, TemplateRef } from '@angular/core';

import { PermissionService, AccessService } from 'app/core';

/**
 * AccessDirective
 *
 * @export
 * @class AccessDirective
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: ` [access],
                [accessMain],
                [accessAdmin],

                [accessReadPermissions],
                [accessEditPermissions],

                [accessReadRoles],
                [accessEditRoles],

                [accessReadUsers],
                [accessEditUsers],

                [accessCreateApplications],
                [accessReadApplications],
                [accessEditApplications],
                [accessCommentApplications],
                [accessDeactivateApplications],
                [accessAcceptApplications],
                [accessSubmitApplications],
                [accessValidateApplications],

                [accessReadConferences],
                [accessEditConferences],

                [accessReadForms],
                [accessEditForms]
                `
})
export class AccessDirective {

    /**
     * Creates an instance of AccessDirective.
     * @param {TemplateRef<any>} templateRef
     * @param {ViewContainerRef} viewContainer
     * @param {PermissionService} permission
     *
     * @memberOf AccessDirective
     */
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private permission: PermissionService
    ) { }

    @Input() set access(permissions: string | string[]) { this.restrictVisibility(permissions, null, true); }

    @Input() set accessMain(i: number) {
        this.restrictVisibility(AccessService.map.main, i, true);
    }

    @Input() set accessAdmin(i: number) {
        this.restrictVisibility(AccessService.map.admin, i, true);
    }

    /** Main Area */

    @Input() set accessReadApplications(i: number) { this.restrictVisibility('ReadApplications', i); }
    @Input() set accessEditApplications(i: number) { this.restrictVisibility('EditApplications', i); }
    @Input() set accessCreateApplications(i: number) { this.restrictVisibility('CreateApplications', i); }
    @Input() set accessCommentApplications(i: number) { this.restrictVisibility('CommentApplications', i); }
    @Input() set accessDeactivateApplications(i: number) { this.restrictVisibility('DeactivateApplications', i); }
    @Input() set accessAcceptApplications(i: number) { this.restrictVisibility('AcceptApplications', i); }
    @Input() set accessSubmitApplications(i: number) { this.restrictVisibility('SubmitApplications', i); }
    @Input() set accessValidateApplications(i: number) { this.restrictVisibility('ValidateApplications', i); }

    @Input() set accessReadConferences(i: number) { this.restrictVisibility('ReadConferences', i); }
    @Input() set accessEditConferences(i: number) { this.restrictVisibility('EditConferences', i); }

    /** Admin Area */

    @Input() set accessReadForms(i: number) { this.restrictVisibility('ReadForms', i); }
    @Input() set accessEditForms(i: number) { this.restrictVisibility('EditForms', i); }

    @Input() set accessReadRoles(i: number) { this.restrictVisibility('ReadRoles', i); }
    @Input() set accessEditRoles(i: number) { this.restrictVisibility('EditRoles', i); }

    @Input() set accessReadUsers(i: number) { this.restrictVisibility('ReadUsers', i); }
    @Input() set accessEditUsers(i: number) { this.restrictVisibility('EditUsers', i); }

    @Input() set accessReadPermissions(i: number) { this.restrictVisibility('ReadPermissions', i); }
    @Input() set accessEditPermissions(i: number) { this.restrictVisibility('EditPermissions', i); }

    /**
     * check if the user has the requested permissions
     * @param {String|Array<String>} permission - the permission(s) to check for
     * @param {Number} param - any param. if set the function checks if the user has NOT the permission
     * @param {Boolean} or - arrays only: checks if the user has any (true) or all (false) of the given permissions
     */
    private restrictVisibility(permission: string | string[], param: number, or = false) {
        const access = this.permission.hasPermission(permission, or);
        if ((access && !param) || (!access && !!param)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}



