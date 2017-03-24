# PK4.0

## Ersteinrichtung

Installiere ``NodeJs (6.9.5)``

Globale Installation der NPM-Module (``npm install -g``)  
``@angular/cli``  
``karma``

Installation der node_modules mit ``npm install`` im Root-Folder

## Entwicklung

### Server
``ng serve`` oder ``npm start`` starten Server mit Live-Reload (default: localhost:4200)  
``npm run serve-i18n:de`` startet Server in deutscher Sprache  
``npm run serve-i18n:en`` startet Server in englischer Sprache  

### Unit-Tests
``ng test`` startet Live-Server mit Unit-Tests  
``npm run test`` lässt Unit-Tests einmalig durchlaufen  
``npm run coverage`` lässt Unit-Tests einmalig durchlaufen und erstellt einen coverage Bericht in ``/coverage``    

### E2E-Tests
``npm run e2e`` lässt End-to-End Tests einmal durchlaufen, jedoch benötigt es einen Laufenden Entwicklungsserver (``ng serve``)  

## Swagger
``npm run swagger`` löscht den Ordner ``/src/app/swagger`` und generiert diesen anhand der API neu. Alle Files müssen daraufhin durchgegangen und überarbeitet werden.

## i18n
``npm run i18n`` extrahiert alle i18n Attribute aus den Template-Dateien und schreibt diese als Dictionary in die ``src/i18n/messages.xlf``.  
Diese müssen nun in die jeweiligen sprachen ``.de.xlf`` und ``.en.xlf`` übersetzt werden.

## Production

### Build
``npm run build-i18n`` baut die Anwendung in ``de`` und ``en`` im Ordner ``/dist/de`` bzw. ``/dist/en``.  
Die ``sample.htaccess`` muss als ``.htaccess`` in den ``/dist`` Ordner kopiert werden damit die Weiterleitung auf die verschiedenen Sprachen funktioniert.

### Dokumentation
``npm run doc`` baut die Dokumentation in ``/documentation``  
``npm run doc:serve`` lässt die gebaute Dokumentation zusätzlich auf ``http://127.0.0.1:8080/`` laufen
