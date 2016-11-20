import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'pk-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    private form: Array<Object>;

    constructor() { }

    ngOnInit() {
        this.form = [
            {
                elementType: 'h3',
                name: 'header01',
                value: 'Hochschule für Angewandte Wissenschaften Augsburg',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'date',
                type: 'date',
                label: 'Augsburg, den',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'h4',
                name: 'header02',
                value: 'Zulassungsantrag - Abschlussarbeit',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'matnr',
                type: 'number',
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
                elementType: 'input',
                name: 'fakultaet',
                label: 'Fakultaet',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'Studiengang',
                type: 'input',
                label: 'Studiengang und Richtung',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'textarea',
                name: 'address',
                label: 'Namen und Adresse',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'info',
                name: 'info',
                value: 'Hinweise für den Antragsteller: Jemand musste Josef K. verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet. »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben. Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt.',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'info',
                name: 'info2',
                value: 'Und es war ihnen wie eine Bestätigung ihrer neuen Träume und guten Absichten, als am Ziele ihrer Fahrt die Tochter als erste sich erhob und ihren jungen Körper dehnte.'
            },
            {
                elementType: 'input',
                name: 'erstpruefer',
                type: 'input',
                label: 'Aufgabensteller/Erstprüfer',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'input',
                name: 'zweitpruefer',
                type: 'input',
                label: 'Zweitprüfer',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'radio',
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
                elementType: 'textarea',
                name: 'thema',
                label: 'Theme (Zeugnissfassung):',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'textarea',
                name: 'company',
                label: 'Name der Firma:',
                styles: [
                    'small'
                ]
            },
            {
                elementType: 'checkbox',
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
