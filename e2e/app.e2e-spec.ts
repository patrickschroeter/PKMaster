import { Page } from './app.po';
import { Applications } from './applications.po';
import { Forms } from './forms.po';
import { Form } from './form.po';
import { Login } from './login.po';

import { browser, element, by } from 'protractor';

import { click } from './';
import { Button, shouldSee } from './application.po';

describe('The User', function () {

    let App: Page;
    let LoginPage: Login;

    beforeEach(() => {
        App = new Page();
        LoginPage = new Login();
    });

    it('should be redirected to login form', () => {
        App.navigateTo();

        const email = element(by.css('#email'));
        expect(email).toBeTruthy();

        const password = element(by.css('#password'));
        expect(password).toBeTruthy();
    });

    it('should be able login', () => {
        LoginPage.login();

        App.logout();
    });

});

describe('The Almighty User', () => {

    const formName = 'e2e-Form';

    let App: Page;
    let LoginPage: Login;
    let ApplicationsPage: Applications;
    let FormsPage: Forms;
    let FormPage: Form;

    beforeEach(() => {
        App = new Page();
        LoginPage = new Login();
        ApplicationsPage = new Applications();
        FormsPage = new Forms();
        FormPage = new Form();

        LoginPage.login();
    });

    afterEach(() => {
        App.logout();
    });

    it('should go to form tab', () => {
        App.goToTab('forms');
    });

    it('should create a new form with an element', () => {
        App.goToTab('forms');

        FormsPage.openNewFormModal();
        FormsPage.createNewForm(formName, true, true);

        FormPage.openNewElement();
        FormPage.selectElementFieldType('Input');
        FormPage.fillElement();
        FormPage.saveElement();
        FormPage.saveForm();
    });

    it('should create a valid application', () => {
        ApplicationsPage.createFilledApplication();
    });
    it('should create a submitted application', () => {
        ApplicationsPage.createSubmittedApplication();
    });
    it('should create a pending application', () => {
        ApplicationsPage.createPendingApplication();
    });
    it('should create an accepted application', () => {
        ApplicationsPage.createAcceptedApplication();
    });
    it('should create a denied application', () => {
        ApplicationsPage.createDeniedApplication();
    });
});

describe('The Student:', () => {

    let App: Page;
    let LoginPage: Login;
    let ApplicationsPage: Applications;

    let formId: string;

    beforeAll(() => {
        App = new Page();
        LoginPage = new Login();
        ApplicationsPage = new Applications();
    });

    beforeEach(() => {
        LoginPage.login('student@pk.de');
    });

    afterEach(() => {
        App.logout();
    });

    it('should be on applications page', () => {
        expect(element(by.css('#applications')));
    });

    describe('should not see', () => {
        it('forms', () => {
            expect(browser.isElementPresent(by.css('#nav-forms'))).toBe(false);
        });
        it('admin', () => {
            expect(browser.isElementPresent(by.css('#nav-admin'))).toBe(false);
        });
    });

    it('should be able to create a form', () => {
        ApplicationsPage.createFilledApplication();

        browser.getCurrentUrl().then(url => {
            formId = url.split('/')[4];
        });
    });
});

describe('Application Created', () => {
    let App: Page;
    let LoginPage: Login;
    let ApplicationsPage: Applications;

    let formId: string;

    beforeAll(() => {
        App = new Page();
        LoginPage = new Login();
        ApplicationsPage = new Applications();

        LoginPage.login('student@pk.de');

        ApplicationsPage.createFilledApplication();

        browser.getCurrentUrl().then(url => {
            formId = url.split('/')[4];
        });

        App.logout();
    });

    describe('student', () => {
        beforeAll(() => {
            LoginPage.login('student@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Deactivate,
            Button.Edit,
            Button.Submit,
            Button.Comment
        );
    });

    describe('observer', () => {
        beforeAll(() => {
            LoginPage.login('observer@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Comment
        );
    });

    describe('secreteriat', () => {
        beforeAll(() => {
            LoginPage.login('secreteriat@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Comment,
            Button.Edit
        );
    });

    describe('member', () => {
        beforeAll(() => {
            LoginPage.login('member@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Comment
        );
    });

    describe('principal', () => {
        beforeAll(() => {
            LoginPage.login('principal@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Comment,
            Button.Deactivate,
            Button.Submit,
            Button.Edit
        );
    });
});

describe('Application Submitted', () => {
    let App: Page;
    let LoginPage: Login;
    let ApplicationsPage: Applications;

    let formId: string;

    beforeAll(() => {
        App = new Page();
        LoginPage = new Login();
        ApplicationsPage = new Applications();

        LoginPage.login('student@pk.de');

        ApplicationsPage.createSubmittedApplication();

        browser.getCurrentUrl().then(url => {
            formId = url.split('/')[4];
        });

        App.logout();
    });

    describe('student', () => {
        beforeAll(() => {
            LoginPage.login('student@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Rescind,
            Button.Assign,
            Button.Comment
        );
    });

    describe('observer', () => {
        beforeAll(() => {
            LoginPage.login('observer@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Comment
        );
    });

    describe('secreteriat', () => {
        beforeAll(() => {
            LoginPage.login('secreteriat@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Rescind,
            Button.Comment
        );
    });

    describe('member', () => {
        beforeAll(() => {
            LoginPage.login('member@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Assign,
            Button.Comment
        );
    });

    describe('principal', () => {
        beforeAll(() => {
            LoginPage.login('principal@pk.de');
            App.goTo('/applications/' + formId);
            App.openOptions();
        });

        afterAll(() => {
            App.logout();
        });

        shouldSee(
            Button.Rescind,
            Button.Conference,
            Button.Assign,
            Button.Comment
        );
    });
});

describe('Application Pending', () => {
    let App: Page;
    let LoginPage: Login;
    let ApplicationsPage: Applications;

    let formId: string;

    beforeAll(() => {
        App = new Page();
        LoginPage = new Login();
        ApplicationsPage = new Applications();

        LoginPage.login('student@pk.de');

        ApplicationsPage.createSubmittedApplication();

        browser.getCurrentUrl().then(url => {
            formId = url.split('/')[4];
        });

        App.logout();
    });

    describe('', () => {

        beforeAll(() => {
            LoginPage.login('principal@pk.de');

            App.goTo('/applications/' + formId);

            App.openOptions();
            ApplicationsPage.assignApplicationToConference();

            App.logout();
        });

        describe('student', () => {
            beforeAll(() => {
                LoginPage.login('student@pk.de');
                App.goTo('/applications/' + formId);
                App.openOptions();
            });

            afterAll(() => {
                App.logout();
            });

            shouldSee(
                Button.Comment
            );
        });

        describe('observer', () => {
            beforeAll(() => {
                LoginPage.login('observer@pk.de');
                App.goTo('/applications/' + formId);
                App.openOptions();
            });

            afterAll(() => {
                App.logout();
            });

            shouldSee(
                Button.Comment
            );
        });

        describe('secreteriat', () => {
            beforeAll(() => {
                LoginPage.login('secreteriat@pk.de');
                App.goTo('/applications/' + formId);
                App.openOptions();
            });

            afterAll(() => {
                App.logout();
            });

            shouldSee(
                Button.Comment
            );
        });

        describe('member', () => {
            beforeAll(() => {
                LoginPage.login('member@pk.de');
                App.goTo('/applications/' + formId);
                App.openOptions();
            });

            afterAll(() => {
                App.logout();
            });

            shouldSee(
                Button.Assign,
                Button.Comment
            );
        });

        describe('principal', () => {
            beforeAll(() => {
                LoginPage.login('principal@pk.de');
                App.goTo('/applications/' + formId);
                App.openOptions();
            });

            afterAll(() => {
                App.logout();
            });

            shouldSee(
                Button.Assign,
                Button.Accept,
                Button.Conference,
                Button.Comment
            );
        });
    });
});
