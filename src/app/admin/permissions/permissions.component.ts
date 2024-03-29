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

import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

/** Services */
import { PermissionService } from 'app/core';
import { AlertService } from 'app/modules/alert';
import { TranslationService } from 'app/modules/translation';

/** Models */
import { PermissionDto, FieldDto } from 'app/swagger';
import { OverlayComponent } from 'app/modules/overlay';

/** Decorators */
import { Access, OnAccess } from 'app/shared/decorators/access.decorator';

/**
 * PermissionsComponent
 *
 * @export
 * @class PermissionsComponent
 * @implements {OnInit}
 * @implements {OnAccess}
 */
@Component({
    selector: 'pk-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit, OnAccess {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

    public permissions: PermissionDto[];
    public editPermissionForm: FieldDto[];

    public editingPermission: PermissionDto;

    /**
     * Creates an instance of PermissionsComponent.
     * @param {PermissionService} permission
     * @param {AlertService} alert
     * @param {TranslationService} translationService
     *
     * @memberOf PermissionsComponent
     */
    constructor(
        public permission: PermissionService,
        public alert: AlertService,
        private translationService: TranslationService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf PermissionsComponent
     */
    ngOnInit() {
        this.getPermissions();
    }

    /**
     * Catch latest permissions from server
     *
     * @private
     *
     * @memberOf PermissionsComponent
     */
    @Access('ReadPermissions')
    private getPermissions(): void {
        this.permission.getPermissions().subscribe(result => {
            this.permissions = result;
        });
    }

    /**
     * Creates a new form and opens the overlay
     *
     * @param {PermissionDto} permission
     *
     * @memberOf PermissionsComponent
     */
    @Access('EditPermissions')
    public editPermission(permission: PermissionDto) {
        this.editPermissionForm = [
            {
                fieldType: 'input',
                name: 'name',
                disabled: true,
                value: permission.name
            },
            {
                fieldType: 'textarea',
                name: 'description',
                value: permission.description
            }
        ];
        this.editingPermission = permission;

        if (this.overlay instanceof OverlayComponent) {
            this.overlay.close.subscribe(() => {
                this.editingPermission = null;
            });

            this.overlay.toggle();
        }
    }

    /**
     * updates an existing permission
     *
     * @param {FormGroup} form
     * @returns {void}
     *
     * @memberOf PermissionsComponent
     */
    @Access('EditPermissions')
    public updatePermission(form: FormGroup): void {
        const onError = () => {
            this.overlay.toggle(false);
            this.alert.setAlert(
                this.translationService.translate('headerError'),
                this.translationService.translate('errorUpdatePermission')
            );
        };
        if (!this.editingPermission) {
            return onError();
        }
        const request: PermissionDto = new PermissionDto(this.editingPermission);
        request.description = form.get('description').value;

        this.permission.updatePermission(request.id, request).subscribe(result => {
            const permission = _.find(this.permissions, (obj: PermissionDto) => obj.id === result.id);
            if (permission) {
                permission.description = result.description;
                this.overlay.toggle(false);
            } else {
                onError();
            }
        }, error => {
            onError();
        });
    }
}
