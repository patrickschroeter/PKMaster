import { Injectable } from '@angular/core';

import { ModalAddConferenceEntryComponent } from './../../';

/** Interfaces */
import { Window } from './../..';

@Injectable()
export class WindowService {

    protected modal: Window;

    constructor() { }

    /**
     * sets the component instance to work with
     * @param {Window} modal
     */
    public setModal(modal: Window): WindowService {
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
    public openModal(options?: Object): WindowService {
        if (this.modal) {
            this.modal.open(options);
        }
        return this;
    }
}