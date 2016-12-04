import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { AlertService } from './../alert';
import { Field, Form } from './../../../swagger';

@Injectable()
export class FormService {

    /** The form to edit */
    private form: Form;
    private forms: Form[];
    /** Index of editing Element */
    private editingElementIndex: number;

    private addingElement$: Observer<boolean>;
    private addingElementRx: Observable<any>;

    private editElementRx: Observable<Field>;
    private editElement$: Observer<Field>;

    constructor(private alert: AlertService) {
        this.form = {
            title: 'Titel der Form',
            id: 13,
            elements: [{ fieldType: 'h3', name: 'header01', value: 'Hochschule für Angewandte Wissenschaften Augsburg', styles: ['small'] }, { fieldType: 'input', name: 'date', contentType: 'date', label: 'Augsburg, den', styles: ['small'] }, { fieldType: 'h4', name: 'header02', value: 'Zulassungsantrag - Abschlussarbeit', styles: ['small'] }, { fieldType: 'input', name: 'matnr', contentType: 'number', label: 'Matrikelnummer', validations: ['minLength', 'maxLength'], styles: ['small'] }, { fieldType: 'input', name: 'fakultaet', label: 'Fakultaet', styles: ['small'], value: ['Informatik', 'Gestaltung'] }, { fieldType: 'input', name: 'Studiengang', label: 'Studiengang und Richtung', styles: ['small'] }, { fieldType: 'textarea', name: 'address', label: 'Namen und Adresse', styles: ['small'] }, { fieldType: 'info', name: 'info', value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.', styles: ['small'] }, { fieldType: 'info', name: 'info2', value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.' }, { fieldType: 'input', name: 'erstpruefer', label: 'Aufgabensteller/Erstprüfer', styles: ['small'] }, { fieldType: 'input', name: 'zweitpruefer', label: 'Zweitprüfer', styles: ['small'] }, { fieldType: 'radio', name: 'inHouse', label: 'Die Arbeit soll bearbeitet werden:', options: [{ value: 'inside', label: 'im Haus' }, { value: 'outside', label: 'außerhalb der HS' }] }, { fieldType: 'textarea', name: 'thema', label: 'Theme (Zeugnissfassung):', styles: ['small'] }, { fieldType: 'textarea', name: 'company', label: 'Name der Firma:', styles: ['small'] }, { fieldType: 'checkbox', name: 'sign', label: 'Hiermit bestätige ich die Angaben.', validations: ['toBeTrue'] }, {
                fieldType: 'datalist',
                name: 'datalist',
                label: 'datalist'
            },{
                fieldType: 'select',
                name: 'select',
                label: 'Select',
                multipleSelect: true,
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
                fieldType: 'select',
                name: 'select2',
                label: 'Select',
                multipleSelect: true,
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
    public onEditElement(): Observable<Field> {
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
    public editElement(element?: Field): void {

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
    public removeElement(element?: Field, index?: number): boolean {
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
    public addElementToForm(element: Field, mode?: 'clone' | 'add'): boolean {
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
        return this.addElementToForm({"fieldType":"input","name":"matnr","required":true,"label":"Matrikelnummer","type":"number","placeholder":"","styles":["small"],"value":""}, 'clone');
    }

    /**
     * @description returns the template to edit form attributes
     * @param {number} id
     * @return {Observable}
     */
    public getEditFormTemplate(id?: number): Observable<any> {
        let formEdit = [
            {
                fieldType: 'input',
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
                fieldType: 'checkbox',
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
            delete element['formControl'];
            elements.push(element);
        }
        console.log(JSON.stringify(elements));
    }
}

var notennachmeldung = [{"fieldType":"h3","name":"header","value":"Antrag auf Notennachmeldung/Notenänderung* an die Prüfungskommision"},{"fieldType":"select","name":"studiengang","required":true,"label":"","placeholder":"Sudiengang wählen","optionTable":"","options":[{"value":"architektur","label":"Studiengang Architektur"},{"value":"bauingenieurwesen","label":"Studiengang Bauingenieurwesen"},{"value":"e2d","label":"Studiengang E2D"}],"value":""},{"fieldType":"input","name":"name","required":true,"label":"Name, Vorname","contentType":"text","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"matnr","required":true,"label":"Matrikelnummer","contentType":"number","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"street","required":true,"label":"Straße","contentType":"text","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"housenr","required":false,"label":"Hausnummer","contentType":"number","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"plz","required":"","label":"Postleitzahl","contentType":"number","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"city","required":true,"label":"Wohnort","contentType":"text","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"email","required":"","label":"Email","contentType":"text","placeholder":"","styles":["small"],"value":""},{"fieldType":"input","name":"phone","required":"","label":"Telefon","contentType":"number","placeholder":"","styles":["small"],"value":""},{"fieldType":"devider","name":"dev1","value":""},{"fieldType":"input","name":"fach","required":true,"label":"Prüfungsfach","contentType":"text","placeholder":"","value":""}];

var secondform = [
    {
        fieldType: 'datalist',
        name: 'datalist',
        label: 'Datalist',
        required: true
    },
    {
        fieldType: 'input',
        name: 'email',
        contentType: 'input',
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
        fieldType: 'input',
        name: 'password',
        contentType: 'password',
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
        fieldType: 'input',
        name: 'date',
        contentType: 'date'
    },
    {
        fieldType: 'input',
        name: 'text',
    },
    {
        fieldType: 'checkbox',
        name: 'privacy',
        label: 'Sell your Soul?',
        validations: [
            'toBeTrue',
        ]
    },
    {
        fieldType: 'select',
        name: 'country',
        label: 'Land',
        required: true,
        multipleSelect: false,
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
        fieldType: 'select',
        name: 'country',
        label: 'Land',
        required: true,
        multipleSelect: true,
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
        fieldType: 'radio',
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
        fieldType: 'textarea',
        name: 'desc',
        label: 'Description',
        required: true,
        value: 'de'
    },
    {
        fieldType: 'textarea',
        name: 'info',
        label: 'Info',
        required: true,
        placeholder: 'Something',
        styles: [
            'small'
        ]
    }
];
