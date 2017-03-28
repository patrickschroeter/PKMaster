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

import { Injectable } from '@angular/core';

import { ModalAddConferenceEntryComponent } from './../../';

/** Interfaces */
import { Window } from 'app/models';

/**
 * WindowService
 *
 * @export
 * @class WindowService
 */
@Injectable()
export class WindowService {

    protected modal: Window;

    constructor() { }

    /**
     * sets the component instance to work with
     *
     * @param {Window} modal
     * @returns {WindowService}
     *
     * @memberOf WindowService
     */
    public setModal(modal: Window): WindowService {
        this.modal = modal;
        return this;
    }

    /**
     * sets a save callback function for the modal
     *
     * @param {Function} save
     * @returns {WindowService}
     *
     * @memberOf WindowService
     */
    public setModalSave(save: Function): WindowService {
        if (this.modal) {
            this.modal.save = save;
        } else {
            console.error('There is no modal to add save callback');
        }
        return this;
    }

    /**
     * opens the modal
     *
     * @param {Object} [options]
     * @returns {WindowService}
     *
     * @memberOf WindowService
     */
    public openModal(options?: Object): WindowService {
        if (this.modal) {
            this.modal.open(options);
        } else {
            console.error('There is no modal to open');
        }
        return this;
    }
}
