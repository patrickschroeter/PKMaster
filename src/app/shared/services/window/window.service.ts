import { Injectable } from '@angular/core';

import { ModalAddConferenceEntryComponent } from './../../';

@Injectable()
export class WindowService {

    private modal: ModalAddConferenceEntryComponent;

    constructor() { }

    /**
     * sets the component instance to work with
     * @param {ModalAddConferenceEntryComponent} modal
     */
    public setModal(modal: ModalAddConferenceEntryComponent): WindowService {
        this.modal = modal;
        return this;
    }

    /**
     * sets a save callback function for the modal
     * @param {Function} save
     */
    public setModalSave(save: Function): WindowService {
        this.modal.save = save;
        return this;
    }

    /**
     * opens the modal
     */
    public openModal(): WindowService {
        if (this.modal && this.modal instanceof ModalAddConferenceEntryComponent) {
            this.modal.open();
        }
        return this;
    }
}
