import { Field } from './../swagger';

class FieldModel implements Field {

    name: string = undefined;
    label: string = undefined;
    fieldType: string = 'input';
    required: boolean = false;
    multipleSelect: boolean = false;
    value: string | string[] = undefined;
    contentType: string = undefined;
    placeholder: string = undefined;
    options: string = undefined;
    styles: string[] = ['small'];
    disabled: boolean = false;

    constructor(value?: string, options?: any) {
        this.update(options);
        this.value = value;
    }

    update(options?: any) {
        if (options) {
            for (let key in options) {
                if (!options.hasOwnProperty(key)) { continue; }
                this[key] = options[key];
            }
        }
    }
}

/** Default */
class Input extends FieldModel { }
class Textarea extends FieldModel {
    inputType = 'textare';
}
class Checkbox extends FieldModel {
    inputType = 'checkbox';
}
class Select extends FieldModel {
    inputType = 'select';
}
class Radio extends FieldModel {
    inputType = 'radio';
}
class Datalist extends FieldModel {
    inputType = 'datalist';
}
class H1 extends FieldModel {
    inputType = 'h1';
}
class H2 extends FieldModel {
    inputType = 'h2';
}
class H3 extends FieldModel {
    inputType = 'h3';
}
class H4 extends FieldModel {
    inputType = 'h4';
}
class Info extends FieldModel {
    inputType = 'info';
}
class Password extends FieldModel {
    contentType = 'password';
    required = true;
}


/**
 * User
 */

class Firstname extends FieldModel {
    name = 'firstname';
    label = 'Firstname';
};

class Lastname extends FieldModel {
    name = 'lastname';
    label = 'Lastname';
}

class Email extends FieldModel {
    name = 'email';
    label = 'E-Mail';
    contentType = 'email';
    validations = [
        'isEmail',
        'useExternalEmail'
    ];
}

class Matrikelnummer extends FieldModel {
    name = 'matNr';
    label = 'Matrikelnummer';
    contentType = 'number';
    disabled = true;
}

/**
 * Styling
 */

class Devider extends FieldModel {
    fieldType = 'devider';
    styles = undefined;
}

const Fields = {
    Input,
    Textarea,
    Checkbox,
    Radio,
    Select,
    Datalist,
    H1, H2, H3, H4,
    Info,

    Password,

    Firstname,
    Lastname,
    Email,
    Matrikelnummer,

    Devider
};

export {
    Fields
};
