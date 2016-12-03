import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { FormElement, Form } from './../../../swagger';

@Injectable()
export class FormService {

    /** The form to edit */
    private form: Form;
    private forms: Form[];
    /** Index of editing Element */
    private editingElementIndex: number;

    private addingElement$: Observer<boolean>;
    private addingElementRx: Observable<any>;

    private editElementRx: Observable<FormElement>;
    private editElement$: Observer<FormElement>;

    constructor(private alert: AlertService) {
        this.form = {
            title: 'Titel der Form',
            id: 13,
            elements: [{ elementType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { elementType: 'input', name: 'date', type: 'date', label: 'Augsburg, den', styles: ['small'] }, { elementType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styles: ['small'] }, { elementType: 'input', name: 'matnr', type: 'number', label: 'Matrikelnummer', validations: ['minLength', 'maxLength'], styles: ['small'] }, { elementType: 'input', name: 'fakultaet', label: 'Fakultaet', styles: ['small'], value: ['Informatik', 'Gestaltung'] }, { elementType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styles: ['small'] }, { elementType: 'textarea', name: 'address', label: 'Namen und Adresse', styles: ['small'] }, { elementType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styles: ['small'] }, { elementType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { elementType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styles: ['small'] }, { elementType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styles: ['small'] }, { elementType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { elementType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styles: ['small'] }, { elementType: 'textarea', name: 'company', label: 'Name der Firma:', styles: ['small'] }, { elementType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validations: ['toBeTrue'] }, {
                elementType: 'datalist',
                name: 'datalist',
                label: 'datalist'
            },{
                elementType: 'select',
                name: 'select',
                label: 'Select',
                multiple: true,
                options: [
                    {
                        value: '1',
                        label: 'Erster!',
                    },
                    {
                        value: '2',
                        label: 'Zweites!',
                    }
                ]
            },{
                elementType: 'select',
                name: 'select2',
                label: 'Select',
                multiple: true,
                options: [
                    {
                        value: 'de',
                        label: 'Deutschland'
                    },
                    {
                        value: 'fr',
                        label: 'Frankreich'
                    },
                    {
                        value: 'es',
                        label: 'Spanien'
                    },
                    {
                        value: 'it',
                        label: 'Italien'
                    },
                    {
                        value: 'ir',
                        label: 'Irland'
                    },
                    {
                        value: 'bel',
                        label: 'Belgien'
                    },
                    {
                        value: 'cr',
                        label: 'Croatien'
                    },
                    {
                        value: 'en',
                        label: 'USA'
                    }
                ]
            }]
        };
        this.forms = [
            {
                title: 'Antrag auf Bachelorarbeit',
                id: 1,
                created: 674467500,
                restrictedAccess: true
            },
            {
                title: 'Antrag auf Masterarbeit',
                id: 2,
                created: 1315382700,
                restrictedAccess: false
            },
            {
                title: 'Antrag auf Notennachberechnung',
                id: 3,
                created: 1455613500,
                restrictedAccess: true
            },
            {
                title: 'Antrag auf Notenanrechnung',
                id: 4,
                created: 1477555500,
                restrictedAccess: false
            }
        ];
    }

    /**
     * @description return the observable for the adding element status
     * @return {Observable}
     */
    public getAddingElement(): Observable<boolean> {
        if (!this.addingElementRx) { this.addingElementRx = new Observable(observer => { this.addingElement$ = observer; }); };
        return this.addingElementRx;
    }

    /**
     * @description emits the adding element observable
     * @param {boolean} addingElement
     * @return {void}
     */
    public setAddingElement(addingElement: boolean) {
        this.addingElement$.next(addingElement);
    }

    /**
     * @description return the observable for editing an element
     * @return {Observable}
     */
    public onEditElement(): Observable<FormElement> {
        if (!this.editElementRx) { this.editElementRx = new Observable(observer => { this.editElement$ = observer; }); };
        return this.editElementRx;
    }

    /**
     * @description returns the observable to get a form by the given id
     * @param {number} id
     * @return {Observable}
     */
    public getFormById(id: number): Observable<Form> {
        // TODO: load real data
        return new Observable(observer => {
            /** http getFormById(id) => this.currentForm = result */
            setTimeout(() => {
                observer.next(this.form);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description get the form with the given id with optional sorting
     * @param {string} sort key to sort the result
     * @return {Observable}
     */
    public getForms(sort?: string): Observable<any> {
        if (sort) {
            this.forms.sort(function(a, b) {return (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0); });
        }
        // TODO: load real data
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(this.forms);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description returns the observable to get the new created form
     * @param {Form} form
     * @return {Observable}
     */
    public createNewForm(form: Form): Observable<any> {
        console.log(form);
        this.form = {
            title: form.id ? 'Copy of ' + form.title : form.title,
            id: 13,
            elements: form.id ? this.form.elements : [],
            created: Date.now(),
            restrictedAccess: form.restrictedAccess,
            isPublic: true
        };

        // TODO: save real data
        return new Observable(observer => {
            setTimeout(() => {
                this.forms.push(this.form);
                observer.next(this.form);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description alert invlid type error
     * @param {string} type the invalid type
     * @return {void}
     */
    public editElementError(type: string): void {
        this.alert.setAlert('Warning', `The requrested Element Type (${type}) is not valid. Please Contact your administrator.`);
        this.setAddingElement(false);
    }

    /**
     * @description Open the Add Element View with the Element as preset
     * @param {FormElement} element the element to edit
     * @return {void}
     */
    public editElement(element?: FormElement): void {

        this.editingElementIndex = -1;
        if (element) {
            for (let i = 0, length = this.form.elements.length; i < length; i++) {
                let formElement = this.form.elements[i];
                if (formElement && formElement.name === element.name) {
                    this.editingElementIndex = i;
                };
            }
        }

        this.setAddingElement(true);

        if (this.editingElementIndex !== -1) {
            this.editElement$.next(element);
        } else {
            this.editElement$.next(null);
        }
    }

    /**
     * @description Removes the selected Element from the form
     * @param {FormElement} element the element to remove
     * @return {void}
     */
    public removeElement(element?: FormElement, index?: number): boolean {
        if (typeof index !== 'undefined') {
            if (this.form.elements[index].name === element.name) {
                this.form.elements.splice(index, 1);
                this.alert.setSuccessHint('element_removed', `Element ${element.name} removed.`);
                this.setAddingElement(false);
                return true;
            }
        }
        index = -1;
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let input = this.form.elements[i];
            if (input.name === element.value) {
                index = i;
            }
        }
        if (index !== -1) {
            if (index === this.editingElementIndex) {
                this.form.elements.splice(index, 1);
                this.alert.setSuccessHint('element_removed', `Element ${element.name} removed.`);
                this.setAddingElement(false);
                return true;
            }
        }
        this.alert.setAlert(
            'Identifying Error',
            `There has been an error identifying the correct element.
            Please make sure the Id/Name has not been change.`);
        return false;
    }

    /**
     * @description add the FormElement to the Form
     * @param {FormElement} element the FormElement as JSON
     * @return {boolean}
     */
    public addElementToForm(element: FormElement, mode?: 'clone' | 'add'): boolean {
        /** Forms don't have Presets yet */
        // delete element.value;

        /** Check if the element.name is Unique in the current Form */
        let index = -1;
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let input = this.form.elements[i];
            if (input.name === element.name) {
                index = i;
            }
        }

        /** Add or Update Element to/in Form, otherwise display Error */
        if (index === -1) {
            if (this.editingElementIndex !== -1) {
                this.form.elements[this.editingElementIndex] = element;
            } else {
                this.form.elements.push(element);
            }
        } else if (index === this.editingElementIndex) {
            this.form.elements[this.editingElementIndex] = element;
        } else {
            return false;
        }

        /** Reset the Add Attribute View */
        if (!mode) {
            this.setAddingElement(false);
        }
        this.editingElementIndex = -1;
        return true;
    }

    /**
     * @description adds a preset to the current form
     * @param {string} name the key/id/name of the preset
     * @return {void}
     */
    public addPresetToForm(name: string): void {
        this.editingElementIndex = -1;
        // TODO: load real data
        return this.addElementToForm({"elementType":"input","name":"matnr","required":true,"label":"Matrikelnummer","type":"number","placeholder":"","styles":["small"],"value":""}, 'clone');
    }

    /**
     * @description returns the template to edit form attributes
     * @param {number} id
     * @return {Observable}
     */
    public getEditFormTemplate(id?: number): Observable<any> {
        let formEdit = [
            {
                elementType: 'input',
                name: 'title',
                label: 'Form Name:',
                value: id ? this.form.title : '',
                required: true,
                validations: [
                    'minLength'
                ],
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'checkbox',
                name: 'restrictedAccess',
                label: 'Restricted',
                value: id ? this.form.restrictedAccess : false,
                styles: [
                    'small',
                    'aligned'
                ]
            }
        ];
        // TODO: load real data
        return new Observable(observer => {
            setTimeout(() => {
                observer.next(formEdit);
                observer.complete();
            }, 200);
        });
    }

    /**
     * @description save the attributes (title, etc) of the form
     * @param {Form} form the edit-form with the data to save
     * @return {Observable}
     */
    public saveFormAttributes(form: Form): Observable<any> {
        // TODO: save real data
        return new Observable(observer => {
            setTimeout(() => {
                this.form.title = form.title;
                this.form.restrictedAccess = form.restrictedAccess;
                observer.next(true);
                observer.complete();
            }, 200);
        });
    }


    /**
     * @description Saves the changed Form
     * @return {void}
     */
    public saveForm(): void {
        // TODO: save real data
        console.log(this.form);
        let elements = [];
        for (let i = 0, length = this.form.elements.length; i < length; i++) {
            let element = Object.assign({}, this.form.elements[i]);
            delete element.formControl;
            elements.push(element);
        }
        console.log(JSON.stringify(elements));
    }
}

var notennachmeldung = [{"elementType":"h3","name":"header","value":"Antrag auf Notennachmeldung/Notenänderung* an die Prüfungskommision"},{"elementType":"select","name":"studiengang","required":true,"label":"","placeholder":"Sudiengang wählen","optionTable":"","options":[{"value":"architektur","label":"Studiengang Architektur"},{"value":"bauingenieurwesen","label":"Studiengang Bauingenieurwesen"},{"value":"e2d","label":"Studiengang E2D"}],"value":""},{"elementType":"input","name":"name","required":true,"label":"Name, Vorname","type":"text","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"matnr","required":true,"label":"Matrikelnummer","type":"number","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"street","required":true,"label":"Straße","type":"text","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"housenr","required":false,"label":"Hausnummer","type":"number","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"plz","required":"","label":"Postleitzahl","type":"number","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"city","required":true,"label":"Wohnort","type":"text","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"email","required":"","label":"Email","type":"text","placeholder":"","styles":["small"],"value":""},{"elementType":"input","name":"phone","required":"","label":"Telefon","type":"number","placeholder":"","styles":["small"],"value":""},{"elementType":"devider","name":"dev1","value":""},{"elementType":"input","name":"fach","required":true,"label":"Prüfungsfach","type":"text","placeholder":"","value":""}];

var secondform = [
    {
        elementType: 'datalist',
        name: 'datalist',
        label: 'Datalist',
        required: true
    },
    {
        elementType: 'input',
        name: 'email',
        type: 'input',
        required: true,
        placeholder: 'E-Mail',
        validations: [
            'useExternalEmail',
            'isEmail'
        ],
        styles: [
            'small'
        ]
    },
    {
        elementType: 'input',
        name: 'password',
        type: 'password',
        required: true,
        placeholder: 'Password',
        validations: [
            'minLength',
            'maxLength'
        ],
        styles: [
            'small'
        ]
    },
    {
        elementType: 'input',
        name: 'date',
        type: 'date'
    },
    {
        elementType: 'input',
        name: 'text',
    },
    {
        elementType: 'checkbox',
        name: 'privacy',
        label: 'Sell your Soul?',
        validations: [
            'toBeTrue',
        ]
    },
    {
        elementType: 'select',
        name: 'country',
        label: 'Land',
        required: true,
        multiple: false,
        options: [
            {
                value: 'de',
                label: 'Deutschland'
            },
            {
                value: 'fr',
                label: 'Frankreich'
            },
            {
                value: 'es',
                label: 'Spanien'
            },
            {
                value: 'it',
                label: 'Italien'
            },
            {
                value: 'ir',
                label: 'Irland'
            },
            {
                value: 'bel',
                label: 'Belgien'
            },
            {
                value: 'cr',
                label: 'Croatien'
            },
            {
                value: 'en',
                label: 'USA'
            }
        ]
    },
    {
        elementType: 'select',
        name: 'country',
        label: 'Land',
        required: true,
        multiple: true,
        placeholder: 'Wo kommst du her?',
        options: [
            {
                value: 'de',
                label: 'Deutschland'
            },
            {
                value: 'fr',
                label: 'Frankreich'
            },
            {
                value: 'es',
                label: 'Spanien'
            },
            {
                value: 'it',
                label: 'Italien'
            },
            {
                value: 'ir',
                label: 'Irland'
            },
            {
                value: 'bel',
                label: 'Belgien'
            },
            {
                value: 'cr',
                label: 'Croatien'
            },
            {
                value: 'en',
                label: 'USA'
            }
        ]
    },
    {
        elementType: 'radio',
        name: 'language',
        label: 'Sprache',
        required: true,
        options: [
            {
                value: 'de',
                label: 'deutsch'
            },
            {
                value: 'en',
                label: 'englisch'
            }
        ]
    },
    {
        elementType: 'textarea',
        name: 'desc',
        label: 'Description',
        required: true,
        value: 'de'
    },
    {
        elementType: 'textarea',
        name: 'info',
        label: 'Info',
        required: true,
        placeholder: 'Something',
        styles: [
            'small'
        ]
    }
];
