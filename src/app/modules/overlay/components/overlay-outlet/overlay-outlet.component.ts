import {
    Component,
    OnInit,
    ReflectiveInjector,
    ComponentFactoryResolver,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { OverlayDefaultComponent } from './../overlay-default/overlay-default.component';
import { ModalService } from './../../services/modal/modal.service';

@Component({
    selector: 'pk-overlay-outlet',
    templateUrl: './overlay-outlet.component.html',
    styleUrls: ['./overlay-outlet.component.scss'],
    entryComponents: [
        OverlayDefaultComponent
    ]
})
export class OverlayOutletComponent implements OnInit {

    @ViewChild('outlet', { read: ViewContainerRef }) outlet: ViewContainerRef;

    private componentData;

    constructor(
        private resolver: ComponentFactoryResolver,
        private overlayService: ModalService
    ) { }

    ngOnInit() {
        this.componentData = {
            title: '',
            message: '',
            type: ''
        };

        this.overlayService.getTitle().subscribe(result => {
            this.componentData.title = result;
        });
        this.overlayService.getMessage().subscribe(result => {
            this.componentData.message = result;
        });
        this.overlayService.getType().subscribe(result => {
            this.componentData.type = result;
        });

        this.overlayService.getToggle().subscribe(result => {
            this.createComponent();
        });
    }

    private createComponent() {
        // Inputs need to be in the following format to be resolved properly
        const inputProviders = Object.keys(this.componentData).map((inputName) => { return { provide: inputName, useValue: this.componentData[inputName] }; });
        const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.outlet.parentInjector);

        // We create a factory out of the component we want to create
        const factory = this.resolver.resolveComponentFactory(OverlayDefaultComponent);

        // We create the component using the factory and the injector
        const component = factory.create(injector);

        // We insert the component into the dom container
        this.outlet.clear();
        this.outlet.insert(component.hostView);
    }

}
