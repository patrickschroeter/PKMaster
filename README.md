# PK 4.0

[![Build Status](https://travis-ci.com/patrickschroeter/PKMaster.svg?token=kSqxpzF4oZkoFhFMv5U7&branch=master)](https://travis-ci.com/patrickschroeter/PKMaster)

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Design

## User of Color

accent-color: structuring content
guidance-color: cta
success: save and leave state
error: remove/cancel and leave state


# Development Architecture

## Angular CLI

Tests with Coverage
```
ng test --cc=true
```

## App Architecture: Routes

```
app/
    register/                                   #/register

    login/                                      #/login

    main/                                       #/ ( wrapper template e.g. navbar )
        main-dashboard/                         #/ ( default )

        profile/                                #/profile
            profile-edit/                       #/profile/edit

        applications/                           #/applications
            applications-new/                   #/applications/new
            applications-detail/                #/applications/{application_id}
            applications-edit/                  #/applications/{application_id}/edit

        conferences/                            #/conferences
            conferences-new/                    #/conferences/new
            conferences-detail/                 #/conferences/{conference_id}
            conferences-edit/                   #/conferences/{conference_id}/edit
        
        forms/                                  #/forms
            forms-new/                          #/forms/new (removed, creation with Title in #/forms as overlay)
            forms-detail/                       #/forms/{form_id} (removed -> /edit)
            forms-edit/                         #/forms/{form_id}/edit

    admin/                                      #/admin ( wrapper template e.g. admin-navbar )
        admin-dashboard/                        #/admin ( default )

        roles/                                  #/admin/roles
            roles-new/                          #/admin/roles/new
            roles-detail/                       #/admin/roles/{role_id}
            roles-edit/                         #/admin/roles/{role_id}/edit

        permissions/                            #/admin/permissions
            permissions-detail/                 #/admin/permissions/{permission_id}
            permissions-edit/                   #/admin/permissions/{permission_id}/edit

        users/                                  #/admin/users
            users-detail/                       #/admin/users/{user_id}                          
            users-edit/                         #/admin/users/{user_id}/edit
```

## App Architecture: Services, Directives, Pipes...
```
app/
    /shared
        /elements               : elements (base)      without dependencies/components
        /components             : elements (advanced)  with dependencies/components

        /services

        /pipes

        /directives

    /decorators
```

## Tools

- BEM
- Sass
- Atomic Design
- Angular-Cli / Webpack, Karma, Jasmine


## TODO

validierung? PW, min, max
initialize application ( first admin user )
studiengang einrichten
form restrictions ( user vs dozent )

login.component.spec  
main.component.spec  
applications.component.spec  
conferences.component.spec  
main-dashboard.component.spec  
profile.dashboard.spec  
dynamic-form.component.spec  
navbar.component.spec  

# Meetings

## 13.Oktober (Kowa)

- sobald Antrag eingereicht - nicht mehr löschbar
- sitzung in Antrag verlinkt
- Akzeptierung mit Bedingung (16 statt 20 Wochen) -> textlich in Kommentar
- teilberechtigungen ( zb Sekreteriat )
- andere Formulare für Dozenten
- nicht Fakultäts - sonder PK-Gebunden (Studiengang)
- Facheigene & Fachfremde Fächer
- Sitzungen Kopieren
- Person mit mehreren Rollen
- Admin nur formal nicht inhaltlich -> getrennte Oberfläche
- nicht RZ Email, validierung
- pw SHA256 + Salk (100k) + Session Token
- MatrNr wenn Student
- Versionierung? -> immer neu
- Dozent: Lehrbeauftragter, Professor, wissenschaftl. Angestellte
- Post + Put statt nur Post

## 27.Oktober (Kowa)

- Beziehungstabelle ohne künstliche ID (Performancefrage, Sekundärindex)
- Application: Conference Optional ( + default ?-> eher nicht: merkmal für lock status)
- Application: filled direct in App?`
- User deaktivieren ?
- Antrag für fremde Personen erstellen (Dozent, Pk+Chef) -> für mehrere Studenten, zb Notenänderung
- Antrag deaktivieren (zurückziehen)
- Dozent bestätigen + Note eintragen (zusatz info angeben) -> kommentare?
- Antrag mit änderung Annehmen
- Feld entfernen: unsichtbar außer wert vorhanden -> nicht neu befüllbar
- Anträge versionieren + verlinken -> kommentare von allen Versionen anzeigen

## 2.November (Rothaug)

- Kai Bergmann sucht 'PK-KD'
- VM Ware + Sketch oder Figma
- schlichter mit Farben: eher hell + dunkel + blau
- Strukturfarben (cold) vs. Interaktionsfarben (hot)
- aggressiveres Rot wählen
- Spacing von Labels + kleine als rest
- Abgrenzung von Informationsbereichen, boxing auf großen screens (Moods)
- Font Smoothing
- Google NotoSans
- User Journeys: die wege des users zu ziel mit deren häufigkeit
- Blockbildung + übersichtlichkeit
- Performance + Tastaturbedienbarkeit
- Farblicher Kontrast (zb Background) edit vs view
- visuelle highlights (generator) + icos?
- vgl google forms
