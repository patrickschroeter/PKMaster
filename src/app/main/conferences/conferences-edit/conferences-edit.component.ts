import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/** Services */
import {
    ConferenceService,
    FormService
} from './../../../core';
import { AlertService } from './../../../modules/alert';
import { TranslationService } from './../../../modules/translation';

/** Models */
import { Conference, Form } from './../../../swagger';
import { Selectable, ConferenceConfig } from './../../../models';

/** TODO */ import { ApplicationApiMock } from './../../../core';

@Component({
    selector: 'pk-conferences-edit',
    templateUrl: './conferences-edit.component.html',
    styleUrls: ['./conferences-edit.component.scss']
})
export class ConferencesEditComponent implements OnInit {
    @HostBinding('class') classes = 'content--default';

    public conference: Conference;

    public forms: Selectable[];

    constructor(
        /** Angular */
        private router: Router,
        private activatedRoute: ActivatedRoute,
        /** Modules */
        private alert: AlertService,
        private translationService: TranslationService,
        /** Services */
        private conferenceService: ConferenceService,
        private formService: FormService
    ) { }

    ngOnInit() {
        this.getConference();
    }

    /**
     * get the current conference
     */
    private getConference() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.conferenceService.getConferenceById(params['id']).subscribe(conference => {
                if (!conference) {
                    return this.onError(params['id']);
                } else {
                    this.conference = conference;
                    // this.addConfigToConference();
                }
            }, error => {
                console.error(error);
                return this.onError(params['id']);
            });
        });
    }

    /**
     * onError function for infalid conference id
     * @param {String} id
     */
    private onError(id: string) {
        this.router.navigate(['/conferences']);
        this.alert.setErrorHint('no-conference-found', this.translationService.translate('errorNoConferenceWithId', [id]), 2000);
    }

    /**
     * adds a config object to the conference
     */
    public addConfigToConference() {
        const leistungsnachweise = new ConferenceConfig(
            'Leistungsnachweise'
        )
        .setEntries([
            new ConferenceConfig(
                'Notennachmeldungen',
                null,
                `Diese Entscheidung wurde vom PK-Vorsitzenden am 30. 9. 2016 gemäß RaPO § 3 Abs. 4 vorab getroffen.
                Das Prüfungsamt und die Kommissionsmitglieder wurden am selben Tag über diese Entscheidung informiert.`
            )
            .setEntries([
                ApplicationApiMock.APPLICATION
            ])
            .setFields([
                'h3',
                'date'
            ])
            .setGenericId('1')
            .setConfigType('application')
        ])
        .setConfigType('config');

        const abschlussarbeiten = new ConferenceConfig(
            'Abschlussarbeiten'
        )
        .setEntries([
            ApplicationApiMock.APPLICATION
        ])
        .setFields([
            'date',
            'h3'
        ])
        .setGenericId('1')
        .setConfigType('application');

        this.conference.config = [
            new ConferenceConfig(
                'Feststellung der Beschlussfähigkeit und Genehmigung der Niederschrift',
                `Die Prüfungskommission ist beschlussfähig, da alle stimmberechtigten Mitglieder anwesend sind.
                Die Niederschrift der ${this.conference.numberOfConference - 1}. Sitzung wird einstimmig genehmigt.`
            ),
            leistungsnachweise,
            abschlussarbeiten,
            new ConferenceConfig(
                'Sonstiges'
            ).setEntries([
                new ConferenceConfig(
                    'Neue Fächer'
                ).setEntries([
                    ['Interaktive Mediensysteme (Nachqualifikation)'],
                    ['Workshop Design, (englisch: Workshop Design), nq.design, 2,5 CP, 2 SWS']
                ]).setConfigType('table'),
                new ConferenceConfig(
                    'Termine'
                ).setEntries([
                    ['24. 11. 2016, 14:00 – 16:00', 'J4.13', 'PK- und Studienganssitzung'],
                    ['23. 12. 2016, 12:00', null, 'Abgabe Bachelorarbeit (Ausgabe zum 1. 9. 2016)']
                ]).setConfigType('table')
            ])
            .setConfigType('config')
        ];
    }

    /**
     * add a new config element to the form
     * @param {ConferenceConfig} entry
     */
    public addConfigElement(entry: ConferenceConfig<any>) {
        this.conference.config = this.conference.config || [];
        this.conference.config.push(entry);
    }

    // assign user

    // 6 Sonstiges
    // neue fächer
    // termine

    /**
     * delete conference
     */
    public deleteConference() {
        console.error('TODO');
    }

    /**
     * save the update conference
     */
    public saveConference() {
        this.conferenceService.saveConference(this.conference).subscribe(result => {
            this.conference = result;
            this.router.navigate(['conferences', result.id]);
        });
    }

}
