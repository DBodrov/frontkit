import { FormFieldsTypes, ErrorsTypes } from './PaymentCard';

export const REGEXP_NON_DDS = /[^0-9-\s]+/;
export const REGEXP_NON_DATE = /[^0-9/]+/;
export const REGEXP_NON_LATIN = /[^a-zA-Z' ]+/;
export const REGEXP_NON_DIGITS = /[^0-9]+/;

export const validateCreditCard = (value: string): boolean => {
    value = value.replace(/\D/g, '');

    if (value.length < 12) {
        return false;
    }

    // The Luhn Algorithm
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;

    for (let n = value.length - 1; n >= 0; n--) {
        const cDigit = value.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
            nDigit *= 2;
            if (nDigit > 9) {
                nDigit -= 9;
            }
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return nCheck !== 0 && nCheck % 10 === 0;
};

const validateExp = (value: string): boolean => value.replace(/[^0-9]/g, '').length === 4;

const validateCvv = (value: string): boolean => value.length === 3;

const validateName = (value: string): boolean => value.replace(/\s/g, '').length !== 0;

export const isInvalidInput = (name: string, value: string): boolean => {
    switch (name) {
        case 'cc-number':
            return REGEXP_NON_DDS.test(value);
        case 'cc-name':
            return REGEXP_NON_LATIN.test(value);
        case 'cc-exp':
            return REGEXP_NON_DATE.test(value);
        case 'cc-csc':
            return REGEXP_NON_DIGITS.test(value);
        default:
            return false;
    }
};

export const validate = (name: string, value: string): boolean => {
    switch (name) {
        case 'cc-number':
            return validateCreditCard(value);
        case 'cc-name':
            return validateName(value);
        case 'cc-exp':
            return validateExp(value);
        case 'cc-csc':
            return validateCvv(value);
        default:
            return true;
    }
};

export const isFormInvalid = (formErrors: ErrorsTypes, formState: FormFieldsTypes): boolean => {
    const errors = Object.values(formErrors);
    const state = Object.values(formState);
    const hasError = !errors.some(value => value === true);
    const hasValues = !state.some(value => value === '');
    return hasError && hasValues;
};
