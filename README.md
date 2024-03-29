# PK4.0

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

## Use of Color

accent-color: structuring content
guidance-color: cta
success: save and leave state
error: remove/cancel and leave state


# Development Architecture

## Swagger

### Codegen

rm -rf ./src/app/swagger | java -jar ./.swagger/swagger-codegen-cli.jar generate -i http://pk.multimedia.hs-augsburg.de:8000/swagger/v1/swagger.json -l typescript-angular2 -o ./src/app/swagger

### Json

```
http://pk.multimedia.hs-augsburg.de:8000/swagger/v1/swagger.json
```

## UI

```
http://pk.multimedia.hs-augsburg.de:8000/swagger/ui/index.html#!
```

## Karma Config

https://karma-runner.github.io/0.8/config/configuration-file.html

## Angular CLI

https://cli.angular.io/reference.pdf

or 
```
ng --help
```

Tests with Coverage
```
ng test --cc=true --watch=false
```

### Scripts

#### Server

Dev Server with Mock
```
ng serve
```

Dev Server with API
```
npm start
```

Dev Server with i18n:de
```
npm run serve-i18n:de
```

Dev Server with i18n:en
```
npm run serve-i18n:en
```

Documentation server
```
npm run doc:serve
```

#### Build

Build application for production including i18n
```
npm run build-i18n
```

Build Documentation
```
npm run doc
```

#### Other

Single Test run
```
npm test
```

## Automatec Documentation

https://github.com/compodoc/compodoc

## App Architecture: Routes

```
app/
    register/                                   #/register

    login/                                      #/login

    main/                                       #/ ( wrapper template e.g. navbar )
        profile/                                #/profile
            profile-edit/                       #/profile/edit

        applications/                           #/applications ( default )
            applications-detail/                #/applications/{application_id}
            applications-edit/                  #/applications/{application_id}/edit

        conferences/                            #/conferences
            conferences-detail/                 #/conferences/{conference_id}
            conferences-edit/                   #/conferences/{conference_id}/edit
        
        forms/                                  #/forms
            forms-edit/                         #/forms/{form_id}/edit

    admin/                                      #/admin ( wrapper template e.g. admin-navbar )
        profile/                                #/admin/profile
            profile-edit                        #/admin/profile/edit

        roles/                                  #/admin/roles ( default )
            roles-detail/                       #/admin/roles/{role_id}

        permissions/                            #/admin/permissions

        users/                                  #/admin/users
            users-detail/                       #/admin/users/{user_id}                          
            users-edit/                         #/admin/users/{user_id}/edit
```

## App Architecture: Services, Directives, Pipes...
```
app/
    /core                       
        /services               : Singletons
    /shared
        /elements               : elements (base)      without dependencies/components
        /components             : elements (advanced)  with dependencies/components

        /services               : not singleton Services

        /pipes

        /directives
        
        /decorators

        /interfaces
    
    /models

    /swagger

    /modules
```

## Tools & Patterns

- BEM
- Sass
- Atomic Design
- Angular-Cli / Webpack, Karma, Jasmine
- Grid in REM
- Decorators
- Permissions (decorator, auth-guard, directive)


## TODO

validierung? ~PW, min, max~  
initialize application ( first admin user )  
studiengang einrichten  
~~form restrictions ( user vs dozent )~~  
~form error handling~  
~~success/error notifications~~  
~typsichere get options (by element type)~
~~unset optionTable on option change~~
~~suchfeld bei vielen optionen (select)~~
formService als !singleton into element-edit.component?

# Meetings

## 13.Oktober (Kowa)

- ~~sobald Antrag eingereicht - nicht mehr löschbar~~
- ~~sitzung in Antrag verlinkt~~
- ~~Akzeptierung mit Bedingung (16 statt 20 Wochen) -> textlich in Kommentar~~
- ~~teilberechtigungen ( zb Sekreteriat )~~
- ~~andere Formulare für Dozenten~~
- nicht Fakultäts - sonder PK-Gebunden (Studiengang)
- Facheigene & Fachfremde Fächer
- ~~Sitzungen Kopieren~~
- ~~Person mit mehreren Rollen~~
- ~~Admin nur formal nicht inhaltlich -> getrennte Oberfläche~~
- ~~nicht RZ Email, validierung~~
- ~~pw SHA256 + Salk (100k) + Session Token~~
- ~~MatrNr wenn Student~~
- ~~Versionierung? -> immer neu~~
- Dozent: Lehrbeauftragter, Professor, wissenschaftl. Angestellte
- Post + Put statt nur Post

## 27.Oktober (Kowa)

- Beziehungstabelle ohne künstliche ID (Performancefrage, Sekundärindex)
- ~~Application: Conference Optional ( + default ?-> eher nicht: merkmal für lock status)~~
- ~~Application: filled direct in App?`~~
- User deaktivieren ?
- Antrag für fremde Personen erstellen (Dozent, Pk+Chef) -> für mehrere Studenten, zb Notenänderung
- ~~Antrag deaktivieren (zurückziehen)~~
- Dozent bestätigen + Note eintragen (zusatz info angeben) -> kommentare?
- ~~Antrag mit änderung Annehmen~~
- Feld entfernen: unsichtbar außer wert vorhanden -> nicht neu befüllbar
- ~~Anträge versionieren + verlinken -> kommentare von allen Versionen anzeigen~~

## 2.November (Rothaug)

- ~~Kai Bergmann sucht 'PK-KD'~~
- ~~VM Ware + Sketch oder Figma~~ war nicht so toll
- ~~schlichter mit Farben: eher hell + dunkel + blau~~
- ~~Strukturfarben (cold) vs. Interaktionsfarben (hot)~~
- ~~aggressiveres Rot wählen~~
- ~~Spacing von Labels + kleine als rest~~
- ~~Abgrenzung von Informationsbereichen, boxing auf großen screens (Moods)~~
- ~~Font Smoothing~~
- ~~Google NotoSans~~
- User Journeys: die wege des users zu ziel mit deren häufigkeit
- ~~Blockbildung + übersichtlichkeit~~
- Performance + Tastaturbedienbarkeit
- ~~Farblicher Kontrast (zb Background) edit vs view~~
- visuelle highlights (generator) + icos?
- vgl google forms

## 22.November (Rothaug)

- ~~Farbe checkbox & Radio raus? -> dünnerer Rand?~~
- ~~Labels aggressiver/dunkler~~
- ~~Felder schwarz (auf weiß)~~ -> akzentpunkte: hintergrund grau/rotlich (minimalkontrast), labels müssen funktionieren
- ~~Liste weiß auf hover?~~
- ~~buttons: unterscheidung icon vs button (liste)~~ -> kleiner punkt, outline, zustandsabhängig/progress -> piktogramm
- ~~Angtrag status kleiner, regular~~
- ~~Header zu nah an linie, keine linie? dafür vor liste~~
- ~~buttons reinanimieren~~
- ~~content hinter buttons~~
- ~~sortierung~~
- ~~detail spacing label <-> input~~
- ~~Form X zu groß im vgl. pfeil~~
- ~~default heller als gesetzte werte~~
- ~~hintergrund für form -> layout test, vgl. kirby~~
- ~~vorsicht mit richtungsmetapher: < != cancel, > != ok~~
- ~~alert mehr whitespace (zu klein)~~
- ~~buttons mit natürlicher breite~~
- ~~KONTRAST -> vgl. kirby~~
- ~~Notifications unten rechts: loadig & error & success~~
- ~~content linksseitig -> notifications rechts -> vgl. kirby; was bei formen overview?~~
- ~~Fläche? -> Statusmeldung, Passpartout~~


## 23.Januar (Rothaug)

- ~~PK4.0 ohne leerzeichen, in bold(700)~~
- logo klickbar
- ~~open sans da mehr zwischenschnitte für zb labels~~
- ~~zuordnung content-buttonbereich: heller - dunkler + rötlich~~
- unterschiedliche linientypen zur abgrenzung (länge, dicke farbe) oder hintergründe
- liste: sortierung
- ~~liste: trennlinie, auch zwischen spalten~~
- ~~liste: fläche weiß + abstände statt trennlinie~~
- ~~liste: icons für orientierung/klassifizierung~~
- ~~liste: buttons weisverlauf/weistransparenz~~
- ~~conferenz: trennlinie zur abgrenzung~~
- ~~tabs: nicht bis ganz oben, trennlinie evtl wie abgrenzung~~
- bearbeitungsrahmen dicker/farbe
- Systeminfos vs eingegebene Werte + icons?


### known Bugs

- changing roles does not update user permissione (requires update role of user) [Data Mock]
- Conference Edit Form Fields: move Field in other Config [Library]
