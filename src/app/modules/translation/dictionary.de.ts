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

export const DICTIONARY_DE = {
    errorRequired: 'Feld ist notwendig.',
    errorMaxLength: `Feld darf maximal { 0 } Zeichen lang sein. Derzeit { 1 }.`,
    errorInvalidEmail: 'Feld ist eine ungültige E-Mail Adresse.',
    errorInternalEmail: 'Feld ist keine hochschulexterne E-Mail Adresse',
    errorMinLength: `Feld muss mindestens { 0 } Zeichen lang sein. Derzeit { 1 }.`,
    errorAreEqual: 'Die angegeben Werte stimmen nicht überein.',
    errorInvalidTime: 'Feld ist kein gültiger Zeitpunkt (hh.mm).',
    errorInvalid: 'Form/Feld ist ungültig',

    errorPasswordMatch: 'Das Passwort stimmt nicht mit der Bestätigung überein.',

    headerNotAllowed: 'Nicht Erlaubt',
    headerError: 'Fehler',
    headerWarning: 'Warnung',
    headerIdentifyingError: 'Fehler bei Identifizierung',


    usedId: 'ID wird schon verwendet.',

    elementTypeNotValid: `Element Typ '{ 0 }' existiert nicht.`,
    identifyingError: 'Es ist ein Fehler bei der Identifizierung des Elementes aufgetreten.',
    operationNotAllowed: 'Diese Operation ist nicht erlaubt.',

    removedElement: 'Element wurde entfernt.',
    addedElement: 'Element wurde hinzugefügt.',

    saveForm: 'Speichere Formular...',
    savedForm: 'Formular wurde gespeichert.',
    formName: 'Name des Formulars',

    restricted: 'Beschränkter Zugriff',

    savedFormAttributes: 'Formular wurde aktualisiert.',

    addedPreset: 'Standardelement hinzugefügt.',

    updatedUser: 'User wurde aktualisiert.',

    updatedOption: 'Option wurde aktualisiert.',

    changedPassword: 'Passwort wurde geändert.',
    errorChangedPassword: 'Es ist ein Fehler beim speichern des Passwortes aufgetreten',

    applicationSubmitted: 'Antrag eingereicht.',
    applicationRescinded: 'Antrag zurückgezogen.',
    applicationDeactivated: 'Antrag deaktiviert.',

    errorApplicationEditPermitted: 'Sie sind nicht authorisiert diesen Antrag zu bearbeiten.',
    errorNoApplicationWithId: `Es gibt keinen Antrag mit der ID '{ 0 }'.`,
    errorNoConferenceWithId: `Es gibt keine Sitzung mit der ID '{ 0 }'.`,
    errorNoFormWithId: `Es gibt kein Formular mit der ID '{ 0 }'.`,
    errorUpdatePermission: `Es gibt kein Recht mit der ID '{ 0 }'.`,

    expiredToken: 'Es konnte keine gültige Session gefunden werden.',

    addElementPreset: 'Vordefiniertes Element hinzufügen',

    confirmSubmitApplicationHeader: 'Antrag einreichen?',
    confirmSubmitApplicationContent: 'Möchten Sie den Antrag wirklich einreichen?',

    confirmRescindApplicationHeader: 'Antrag zurückziehen?',
    confirmRescindApplicationContent: 'Möchten Sie den Antrag wirklich zurückziehen?',

    confirmDeactivateApplicationHeader: 'Antrag deaktivieren?',
    confirmDeactivateApplicationContent: 'Möchten Sie den Antrag wirklich deaktivieren?',

    confirm: 'Bestätigen',
    cancel: 'Abbrechen',

    createNewApplication: 'Neuen Antrag erstellen',
    noFormsAvailable: 'Keine Formulare vorhanden.',
    createNewForm: 'Neues Formular erstellen.',

    noPresetsAvailable: 'Keine Standardelemente vorhanden.',
    noPermissionsAvailable: 'Keine Rechte vorhanden',

    addApplicationToConference: 'Antrag zu Sitzung hinzufügen',
    noConferencesAvailable: 'Keine Sitzung verfügbar.',
    createNewConference: 'Neue Sitzung erstellen',

    addPermissionToRole: 'Füge Recht zur Rolle hinzu',

    title: 'Titel',
    description: 'Beschreibung',
    footer: 'Untertitel',
    conferenceEntryType: 'Typ des Eintrages',
    conferenceElementConfig: 'Konfigurationsobject',
    conferenceElementTable: 'Tabelle',
    conferenceElementApplication: 'Antrag',
    conferenceElementList: 'Liste',

    addRoleToUser: 'Rolle zu Nutzer hinzufügen.',
    noRolesAvailable: 'Keine Rollen verfügbar.',
    createNewRole: 'Neue Rolle erstellen.',

    setFormId: 'Formular ID festlegen.',

    editFormFieldsHeader: 'Formularfelder bearbeiten',
    editFormFieldsEmpty: 'Keine Felder in Formular vorhanden.',

    confirmDeleteConferenceHeader: 'Conference Entfernen',
    confirmDeleteConferenceContent: 'Sind Sie sicher, dass Sie die Sitzung dauerhaft löschen möchten?',
    confirmDeleteFormHeader: 'Formular Entfernen',
    confirmDeleteFormContent: 'Sind Sie sicher, dass Sie das Formular dauerhaft löschen möchten?',

    assignUserHeader: 'Benutzer zum Antrag zuteilen.',
    noUsersAvailable: 'Keine Benutzer vorhanden.',
    confirmValidateApplicationHeader: 'Antrag validieren',
    confirmValidateApplicationSave: 'als Gültig markieren',
    confirmValidateApplicationCancel: 'als Ungültig markieren',

    requiresValidation: 'Benötige validierung.',
    isActive: 'Ist aktiv',
    assignMemberHeader: 'Mitglied zur Sitzung hinzufügen.',
    assignGuestHeader: 'Gast zur Sitzung hinzufügen.',
    Error: 'Fehler',
    cantCreateApplication: 'Antrag konnte nicht erstellt werden.',

    updateRequiredHeader: 'Aktualisierung erforderlich!',
    updateRequiredContent: 'Der Antrag ist ungültig. Bitte aktualisieren sie das Formular',
    updateRequiredProgress: 'Das Formular des Antrages wurde aktualisiert. Es kann sein, dass eingetragene Werte verloren gegangen sind.',

    deleteFormErrorHeader: 'Fehler',
    deleteFormErrorContent: 'Beim Versuch das Formular zu löschen ist ein Fehler aufgetreten.',

    registerErrorHeader: 'Fehler',
    registerErrorContent: 'Bei der Registrierung ist ein Fehler aufgetreten',

    'loading-getApplicationById': 'Lade Antrag...',
    'loading-getApplications': 'Lade Anträge...',
    'loading-updateApplication': 'Aktualisiere Antrag...',
    'loading-getConferences': 'Lade Sitzungen...',
    'loading-login': 'Login...',
    'loading-getUser': 'Lade Benutzer...',
    'loading-getForms': 'Lade Formulare...',
    'loading-getFormById': 'Lade Formular...',
    'loading-saveForm': 'Speicher Formular...',
    'loading-assignConferenceToApplication': 'Füge Antrag zur Sitzung hinzu...',
    'loading-getConferenceById': 'Lade Sitzung...',
    'loading-getElementTypeOptions': 'Lade Feld-Definitionen...',
    'loading-getOptionsOfElementType': 'Lade Feld-optionen...',
    'loading-createNewConference': 'Erstelle neue Sitzung...',
    'loading-createNewForm': 'Erstelle neues Formular...',
    'loading-saveConference': 'Speicher Sitzung...',
    'loading-createNewApplication': 'Erstelle neue Antrag...',
    'loading-getStylesOfInputType': 'Lade Feld-Styles...',
    'loading-getValidationsOfInputType': 'Lade Feld-Validierungen...',
    'loading-getRoles': 'Lade Rollen...',
    'loading-getRoleById': 'Lade Rolle...',
    'loading-getUsers': 'Lade Benutzer...',
    'loading-getUserById': 'Lade Benutzer...',
    'loading-getPermissions': 'Lade Rechte...',
    'loading-addRole': 'Lade Rolle...',
    'loading-addPermissionToRole': 'Füge Recht zu Rolle hinzu...',
    'loading-rescindApplication': 'Ziehe Antrag zurück...',
    'loading-saveApplication': 'Speicher Antrag...',
    'loading-addRoleToUser': 'Fügt Rolle zu Benutzer hinzu...',
    'loading-removeRoleFromUser': 'Entfernt Rolle von Benutzer...',
    'loading-removePermissionOfRole': 'Entfernt Recht von Rolle...',
    'loading-removeConference': 'Entfernt Sitzung...',
    'loading-removeForm': 'Entfernt Formular...',
    'loading-getOptionsOfTable': 'Lade Optionen...',
    'loading-updatePermission': 'Aktualisiere Recht...',
    'loading-submitApplication': 'Reiche Antrag ein...',
    'loading-deactivateApplication': 'Deaktiviere Antrag...',
    'loading-updateStatusOfApplication': 'Aktualisiere Status des Antrags...',
    'loading-addCommentToApplication': 'Fügt Kommentar zum Antrag hinzu...',
    'loading-saveFormAttributes': 'Speicher Formular-Attribute',
    'loading-updateRoleById': 'Aktualisiere Rolle...',
    'loading-changePassword': 'Ändere Passwort',
    'loading-updateUser': 'Aktualisiere User...',

    deleteFormHeader: 'Entferne Formular',
    addComment: 'Füge Kommentar hinzu',
    privat: 'Privat',
    roleName: 'Rollen Name',
    currentPassword: 'Aktuelles Passwort',
    newPassword: 'Neues Passwort',
    newPasswordConfirm: 'Neues Passwort bestätigen',
    conferenceDescription: 'Beschreibung der Sitzung',
    numberOfConference: 'Nummer der Sitzung',
    datum: 'Datum',
    start: 'Beginn',
    end: 'Ende',
    room: 'Raum',
    RZName: 'RZ-Name',
    RZPassword: 'RZ-Passwort',
    externalEmail: 'hochschulexterne E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',

    confirmActivateFormHeader: 'Aktiviere Formular',
    confirmActivateFormContent: 'Wollen sie das Formular wirklich aktivieren?',
    activateFormErrorHeader: 'Fehler',
    activateFormErrorContent: 'Beim Aktivieren des Formulars ist ein Fehler aufgetreten.',
    firstname: 'Vorname',
    lastname: 'Nachname',
    rzName: 'RZ-Name',
    email: 'E-Mail',
    employeeType: 'Typ',
    ldapId: 'LDAP ID'
};
