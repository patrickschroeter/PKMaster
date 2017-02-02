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
