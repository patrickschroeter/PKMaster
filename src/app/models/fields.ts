import { FieldDto } from './../swagger';

export class FieldModel implements FieldDto {

    name: string = undefined;
    label: string = undefined;
    fieldType: string = 'input';
    required: boolean = false;
    multipleSelect: boolean = false;
    value: string | string[] = undefined;
    contentType: string = undefined;
    placeholder: string = undefined;
    options: { value: string, label: string}[] = undefined;
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
export class Input extends FieldModel { }
export class Textarea extends FieldModel {
    fieldType = 'textare';
}
export class Checkbox extends FieldModel {
    fieldType = 'checkbox';
}
export class Select extends FieldModel {
    fieldType = 'select';
}
export class Radio extends FieldModel {
    fieldType = 'radio';
}
export class Datalist extends FieldModel {
    fieldType = 'datalist';
}
export class H1 extends FieldModel {
    fieldType = 'h1';
}
export class H2 extends FieldModel {
    fieldType = 'h2';
}
export class H3 extends FieldModel {
    fieldType = 'h3';
}
export class H4 extends FieldModel {
    fieldType = 'h4';
}
export class Info extends FieldModel {
    fieldType = 'info';
}
export class Password extends FieldModel {
    contentType = 'password';
    required = true;
}

/**
 * Form Element Components
 */
export class FieldType extends Select {
    name = 'fieldType';
    label = 'Field Type';
    required = true;
    multipleSelect = false;
    options = [
        { value: 'input',           label: 'Input' },
        { value: 'textarea',        label: 'Textarea' },
        { value: 'checkbox',        label: 'Checkbox' },
        { value: 'radio',           label: 'Radiobutton' },
        { value: 'select',          label: 'Selectbox' },
        { value: 'info',            label: 'Infotext' },
        { value: 'h1',              label: 'Headline (h1)' },
        { value: 'h2',              label: 'Headline (h2)' },
        { value: 'h3',              label: 'Headline (h3)' },
        { value: 'h4',              label: 'Headline (h4)' },
        { value: 'devider',         label: 'Devider' },
        { value: 'hiddenDevider',   label: 'hidden Devider' }
    ];
    styles: string[] = [];
}

export class FieldName extends FieldModel {
    name = 'name';
    label = 'Unique Name (ID)';
    required = true;
}

export class FieldRequired extends Checkbox {
    name = 'required';
    label = 'Required Field';
}

export class FieldLabel extends FieldModel {
    name = 'label';
    label = 'Label of the Input';
}

export class FieldContentType extends Select {
    name = 'contentType';
    label = 'Type of Content';
    required = true;
    options = [
        { value: 'text', label: 'Text' },
        { value: 'password', label: 'Password' },
        { value: 'date', label: 'Date' },
        { value: 'email', label: 'E-Mail' },
        { value: 'number', label: 'Number' }
    ];
}

export class FieldPlaceholder extends FieldModel {
    name = 'placeholder';
    label = 'Placeholder';
}

export class FieldOptionTable extends Select {
    name = 'optionTable';
    label = 'Table of Options';
}

export class FieldOptions extends Datalist {
    name = 'options';
    label = 'Options';
    required = true;
}

export class FieldMultipleSelect extends Checkbox {
    name = 'multipleSelect';
    label = 'Multiselect';
}

export class FieldValue extends FieldModel {
    name = 'value';
    label = 'Value';
    require = true;
}

/** Form Additions */

export class FieldValidation extends Select {
    name = 'validations';
    label = 'Validation Options';
    multipleSelect = true;
}

export class FieldStyles extends Select {
    name = 'styles';
    label = 'Style Options';
    multipleSelect = true;
}

/**
 * User
 */

export class Firstname extends FieldModel {
    name = 'firstname';
    label = 'Firstname';
};

export class Lastname extends FieldModel {
    name = 'lastname';
    label = 'Lastname';
}

export class Email extends FieldModel {
    name = 'email';
    label = 'E-Mail';
    contentType = 'email';
    validations = [
        'isEmail',
        'useExternalEmail'
    ];
}

export class Matrikelnummer extends FieldModel {
    name = 'matNr';
    label = 'Matrikelnummer';
    contentType = 'number';
    disabled = true;
}

/**
 * Styling
 */

export class Devider extends FieldModel {
    fieldType = 'devider';
    styles: string[] = undefined;
}

const Fields = {
    FieldModel,

    Input,
    Textarea,
    Checkbox,
    Radio,
    Select,
    Datalist,
    H1, H2, H3, H4,
    Info,

    Password,
    /** Form Elements */
    FieldType,
    FieldName,
    FieldRequired,
    FieldLabel,
    FieldContentType,
    FieldPlaceholder,
    FieldOptionTable,
    FieldOptions,
    FieldMultipleSelect,
    FieldValue,

    FieldValidation,
    FieldStyles,

    /** Profile Elements */
    Firstname,
    Lastname,
    Email,
    Matrikelnummer,

    /** Default Elements */
    Devider
};

export {
    Fields
};
