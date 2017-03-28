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

import {
    Component,
    OnInit,
    ReflectiveInjector,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef,
    ComponentFactory
} from '@angular/core';

import { ModalErrorComponent } from './../modal-error/modal-error.component';
import { ModalSelectlistComponent } from './../modal-selectlist/modal-selectlist.component';
import { ModalConfirmationComponent } from './../modal-confirmation/modal-confirmation.component';
import { ModalService } from './../../services/modal/modal.service';

/**
 * ModalOutletComponent
 *
 * @export
 * @class ModalOutletComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'pk-modal-outlet',
    templateUrl: './modal-outlet.component.html',
    styleUrls: ['./modal-outlet.component.scss'],
    entryComponents: [
        ModalErrorComponent,
        ModalSelectlistComponent,
        ModalConfirmationComponent
    ]
})
export class ModalOutletComponent implements OnInit {

    @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef;

    private component: any;

    /**
     * Creates an instance of ModalOutletComponent.
     * @param {ComponentFactoryResolver} resolver
     * @param {ModalService} modalService
     *
     * @memberOf ModalOutletComponent
     */
    constructor(
        private resolver: ComponentFactoryResolver,
        private modalService: ModalService
    ) { }

    /**
     * implements OnInit
     *
     * @memberOf ModalOutletComponent
     */
    ngOnInit() {
        this.modalService.register(this);
    }

    /**
     * create a component of the class
     * TODO extend + interface
     *
     * @param {Object} componentData
     * @param {Class} componentClass
     */
    public createComponent(componentData: { [key: string]: any }, componentClass: any) {
        // Inputs need to be in the following format to be resolved properly
        const inputProviders = Object.keys(componentData).map(
            (inputName) => { return { provide: inputName, useValue: componentData[inputName] }; }
        );
        const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.outlet.parentInjector);

        // We create a factory out of the component we want to create
        const factory = this.resolver.resolveComponentFactory(componentClass);

        // We create the component using the factory and the injector
        const component = factory.create(injector);

        this.component = component;

        // We insert the component into the dom container
        this.outlet.clear();
        this.outlet.insert(component.hostView);
    }

    /**
     * destroy the outlet
     *
     * @memberOf ModalOutletComponent
     */
    public destroy() {
        this.outlet.clear();
    }

    /**
     * update the selected values
     * @param {String[]} values
     */
    public updateSelectedValues(values: string[]): void {
        if (this.component && this.component.instance) {
            this.component.instance.selectedValues = values;
        }
    }

}
