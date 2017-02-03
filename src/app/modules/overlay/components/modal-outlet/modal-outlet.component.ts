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

    constructor(
        private resolver: ComponentFactoryResolver,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.modalService.register(this);
    }

    /**
     * create a component of the class
     * @param {Object} componentData
     * @param {Class} componentClass
     */
    public createComponent(componentData: Object, componentClass) {
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
        console.log(component);

        // We insert the component into the dom container
        this.outlet.clear();
        this.outlet.insert(component.hostView);
    }

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
