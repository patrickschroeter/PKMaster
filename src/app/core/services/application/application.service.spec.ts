/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import * as _ from 'lodash';

import { ApplicationService } from './application.service';

import {
    FormService,
    FormMock,
} from './../form';

import { ApplicationMock } from './';
import { StatusDto, ApplicationApi, FormApi, ApplicationDetailDto } from './../../../swagger';
import { ApplicationApiMock, FormApiMock, AuthenticationService, AuthenticationMock } from './..';

import { AlertProviderMock } from './../../../modules/alert/alert.module';
import { TranslationProviderMock } from './../../../modules/translation/translation.module';

describe('Service: Application', () => {
    beforeEach(() => {
        localStorage.setItem('authtoken', 'spectoken');
        TestBed.configureTestingModule({
            providers: [
                ApplicationService,

                { provide: FormService, useClass: FormMock },
                { provide: ApplicationApi, useClass: ApplicationApiMock },
                { provide: FormApi, useClass: FormApiMock },
                { provide: AuthenticationService, useClass: AuthenticationMock },
                ...TranslationProviderMock,
                ...AlertProviderMock
            ]
        });
    });

    it('should ...', inject([ApplicationService], (service: ApplicationService) => {
        expect(service).toBeTruthy();
    }));

    describe('createNewApplication', () => {
        it('should provide the new created application',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {
                let element: ApplicationDetailDto;
                service.createNewApplication({ form: { id: '1' }}).subscribe(result => { element = result; });
                tick(25);
                expect(element).toBeDefined();
                expect(element.id).toBeDefined();
            }))
        );
        xit('should throw an error if the user has not the right to create that kind of application',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
        xit('should throw an error if the application could not be created',
            fakeAsync(inject([ApplicationService], (service: ApplicationService) => {

            }))
        );
    });

    describe('getApplicationById', () => {
        let element: ApplicationDetailDto, service: ApplicationService;

        beforeEach(fakeAsync(inject([ApplicationService], (applicationService: ApplicationService) => {
            service = applicationService;
            service.createNewApplication({ form: { id: '1' }}).subscribe(result => { element = result; });
            tick(25);
        })));

        it('should provide the application with the given id',
            fakeAsync(() => {
                let application: ApplicationDetailDto;
                service.getApplicationById(element.id).subscribe(result => { application = result; });
                tick(25);
                expect(application).toBeDefined();
                expect(application.id).toBe(element.id);
            })
        );
        it('should throw an error if no application with id exists',
            fakeAsync(() => {
                let response: string;
                service.getApplicationById(null).subscribe(() => {
                    response = 'success';
                }, () => {
                    response = 'error';
                });
                tick(25);
                expect(response).toBeDefined();
                expect(response).toBe('error');
            })
        );
        xit('should throw an error if the user has not the rights to read the application',
            fakeAsync(() => {

            })
        );
    });

    describe('getApplications', () => {
        let element: ApplicationDetailDto, service: ApplicationService;

        beforeEach(fakeAsync(inject([ApplicationService], (applicationService: ApplicationService) => {
            service = applicationService;
        })));

        it('should provide an empty array if there are no applications',
            fakeAsync(() => {
                let elements: ApplicationDetailDto[];
                service.getApplications().subscribe(result => { elements = result; });
                tick(25);
                expect(elements).toBeDefined();
                expect(elements.length).toEqual(0);
            })
        );

        describe('(with data)', () => {
            beforeEach(fakeAsync(() => {
                service.createNewApplication({ form: { id: '1' }, version: 2}).subscribe(result => { });
                tick(25);
                service.createNewApplication({ form: { id: '2' }, version: 3}).subscribe(result => { });
                tick(25);
                service.createNewApplication({ form: { id: '3' }, version: 1}).subscribe(result => { element = result; });
                tick(25);
            }));

            it('should provide a list of all applications',
                fakeAsync(() => {
                    let elements: ApplicationDetailDto[];
                    service.getApplications().subscribe(result => { elements = result; });
                tick(25);
                    expect(elements).toBeDefined();
                    expect(elements.length).toEqual(3);
                    expect(elements[2].id).toEqual(element.id);
                })
            );

        });
    });

    describe('submitApplication', () => {
        it('should update the status to <submit> if the operation is allowed (created)',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'created';
                service.submitApplication(application).subscribe(result => {
                    expect(result.id).toEqual(application.id);
                    expect(result.status.name).toEqual('submitted');
                });
            })
        );
        it('should throw an error if the operation is not allowed',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'accepted';
                service.submitApplication(application).subscribe(result => {
                    expect(result).toBeFalsy();
                }, error => {
                    expect(error).toBeTruthy();
                });
            })
        );
    });

    describe('rescindApplication', () => {
        it('should update the status to <rescinded> if the operation is allowed (submitted)',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'submitted';
                service.rescindApplication(application).subscribe(result => {
                    expect(result.id).toEqual(application.id);
                    expect(result.status.name).toEqual('rescinded');
                });
            })
        );
        it('should throw an error if the operation is not allowed',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'accepted';
                service.rescindApplication(application).subscribe(result => {
                    expect(result).toBeFalsy();
                }, error => {
                    expect(error).toBeTruthy();
                });
            })
        );
    });

    describe('deactivateApplication', () => {
        it('should update the status to <deactivated> if the operation is allowed (rescinded)',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'rescinded';
                service.deactivateApplication(application).subscribe(result => {
                    expect(result.id).toEqual(application.id);
                    expect(result.status.name).toEqual('deactivated');
                });
            })
        );
        it('should update the status to <deactivated> if the operation is allowed (created)',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'created';
                service.deactivateApplication(application).subscribe(result => {
                    expect(result.id).toEqual(application.id);
                    expect(result.status.name).toEqual('deactivated');
                });
            })
        );
        it('should throw an error if the operation is not allowed',
            inject([ApplicationService], (service: ApplicationService) => {
                const application = ApplicationApiMock.APPLICATION;
                application.status.name = 'accepted';
                service.deactivateApplication(application).subscribe(result => {
                    expect(result).toBeFalsy();
                }, error => {
                    expect(error).toBeTruthy();
                });
            })
        );
    });

    describe('saveApplication', () => {

        it('should return null if no application is cached',
            inject([ApplicationService], (service: ApplicationService) => {
                expect(service.saveApplication({})).toBeUndefined();
            })
        );

        it('should update the application with the given form-values',
            inject([ApplicationService], (service: ApplicationService) => {
                service.getApplicationById('id').subscribe(application => {
                    service.saveApplication({
                        firstname: 'some date'
                    }).subscribe(result => {
                        expect(_.find(result.attributes, obj => obj.name === 'firstname').value).toEqual('some date');
                    });
                });
            })
        );

        xit('should throw an error if the user has no rights to change the application',
            inject([ApplicationService], (service: ApplicationService) => {

            })
        );
    });

    describe('addCommentToApplication', () => {

        it('should throw an error if no application is cached',
            inject([ApplicationService], (service: ApplicationService) => {
                service.addCommentToApplication({}).subscribe(() => {}, error => {
                    expect(error).toBeTruthy();
                });
            })
        );

        it('should call the api',
            inject([ApplicationService, ApplicationApi], (service: ApplicationService, api: ApplicationApi) => {
                service.getApplicationById('id').subscribe(application => {
                    spyOn(api, 'addCommentToApplication').and.callThrough();
                    service.addCommentToApplication({});
                    expect(api.addCommentToApplication).toHaveBeenCalled();
                });
            })
        );

    });

    describe('updateApplication', () => {

        it('should call the api',
            inject([ApplicationService, ApplicationApi], (service: ApplicationService, api: ApplicationApi) => {
                spyOn(api, 'updateApplicationById').and.callThrough();
                service.updateApplication({});
                expect(api.updateApplicationById).toHaveBeenCalled();
            })
        );

    });
});
