import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'pk-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private _form: Array<Object>;

    get form() { return this._form; };
    set form(form: Array<Object>) { this._form = form; };

    constructor() { }

    ngOnInit() {
        this.form = [
            {
                fieldType: 'h3',
                name: 'header01',
                value: 'Hochschule für Angewandte Wissenschaften Augsburg',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'date',
                contentType: 'date',
                label: 'Augsburg, den',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'h4',
                name: 'header02',
                value: 'Zulassungsantrag - Abschlussarbeit',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'matnr',
                contentType: 'number',
                label: 'Matrikelnummer',
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
                name: 'fakultaet',
                label: 'Fakultaet',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'Studiengang',
                contentType: 'input',
                label: 'Studiengang und Richtung',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'textarea',
                name: 'address',
                label: 'Namen und Adresse',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'info',
                name: 'info',
                value: `Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben,
                denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet.
                »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben.
                Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte,
                fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.`,
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'info',
                name: 'info2',
                value: `Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten,
                als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.`
            },
            {
                fieldType: 'input',
                name: 'erstpruefer',
                contentType: 'input',
                label: 'Aufgabensteller/Erstprüfer',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'input',
                name: 'zweitpruefer',
                contentType: 'input',
                label: 'Zweitprüfer',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'radio',
                name: 'inHouse',
                label: 'Die Arbeit soll bearbeitet werden:',
                options: [
                    {
                        value: 'inside',
                        label: 'im Haus'
                    },
                    {
                        value: 'outside',
                        label: 'außerhalb der HS'
                    }
                ]
            },
            {
                fieldType: 'textarea',
                name: 'thema',
                label: 'Theme (Zeugnissfassung):',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'textarea',
                name: 'company',
                label: 'Name der Firma:',
                styles: [
                    'small'
                ]
            },
            {
                fieldType: 'checkbox',
                name: 'sign',
                label: 'Hiermit bestätige ich die Angaben.',
                validations: [
                    'toBeTrue',
                ]
            }
        ];
    }

    save(event) {

    }

    cancel(event) {

    }
}
