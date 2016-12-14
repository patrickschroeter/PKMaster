import { Directive, Input, HostListener } from '@angular/core';

import { AlertService } from './../../services';

@Directive({
    selector: '[pkAlert]'
})
export class AlertDirective {

    @Input() pkAlert: string;

    private delay: number = 700;
    private timeout;

    constructor(private alert: AlertService) { }

    @HostListener('mouseenter') showHint() {
        this.timeout = setTimeout(() => {
            this.alert.setTooltip(this.pkAlert, 3000);
        }, this.delay);
    }

    @HostListener('mouseleave') hideHint() {
        clearTimeout(this.timeout);
        this.alert.removeHint('tooltip');
    }

}
