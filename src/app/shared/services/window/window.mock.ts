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

import { WindowService } from './';

@Injectable()
export class WindowMock {

    constructor() { }

    /**
     * sets the component instance to work with
     * @param {Window} modal
     */
    public setModal(modal: Window): WindowService {
        return null;
    }

    /**
     * sets a save callback function for the modal
     * @param {Function} save
     */
    public setModalSave(save: Function): WindowService {
        return null;
    }

    /**
     * opens the modal
     */
    public openModal(options?: Object): WindowService {
        return null;
    }
}
