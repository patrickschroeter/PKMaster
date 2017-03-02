import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

/** Services */
import { PermissionService } from './../../core';
import { AlertService } from './../../modules/alert';
import { TranslationService } from './../../modules/translation';

/** Models */
import { PermissionDto, FieldDto } from './../../swagger';
import { OverlayComponent } from './../../modules/overlay';

/** Decorators */
import { Access } from './../../shared/decorators/access.decorator';

@Component({
    selector: 'pk-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    @ViewChild('overlay') overlay: OverlayComponent;

    public permissions: PermissionDto[];
    public editPermissionForm: FieldDto[];

    public editingPermission: PermissionDto;

    constructor(
        private permission: PermissionService,
        private alertService: AlertService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.getPermissions();
    }

    /**
     * Catch latest permissions from server
     */
    @Access('ReadPermissions')
    private getPermissions(): void {
        this.permission.getPermissions().subscribe(result => {
            this.permissions = result;
        });
    }

    /**
     * Creates a new form and opens the overlay
     * @param {Permission} permission
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
     * @param {FormGroup} form
     */
    @Access('EditPermissions')
    public updatePermission(form: FormGroup): void {
        const onError = () => {
            this.overlay.toggle(false);
            this.alertService.setAlert(
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
