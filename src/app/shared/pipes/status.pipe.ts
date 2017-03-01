import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    static names = [
        'invalid',
        'created',
        'submitted',
        'rescinded',
        'pending',
        'deactivated',
        'accepted',
        'denied',
    ];

    transform(value: any, args?: any): any {
        const names = StatusPipe.names;
        const index = +value;
        if (isNaN(index) || names.length <= index || index < 0) {
            return null;
        }
        return names[index];
    }

}
