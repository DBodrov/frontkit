import { FormFieldsTypes, ErrorsTypes, nameType } from './PaymentCard';
import { RANDOM_DATA } from './ramdomizer';

export const REGEXP_NON_DDS = /[^0-9-\s]+/;
export const REGEXP_NON_DATE = /[^0-9/]+/;
export const REGEXP_LETTERS = /[^а-яА-Яa-zA-Z' ]+/;
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

const validateExp = (value: string): boolean => {
    const parsedValue = value.replace(/[^0-9]/g, '');
    const month = parseInt(parsedValue.substring(0, 2), 10);
    const year = parseInt(parsedValue.substring(2, 4), 10);

    const today = +new Date();
    const inputDate = +new Date(2000 + year, month, 0, 23, 59, 59);

    if (parsedValue.length < 4) {
        return false;
    }

    if (month < 1 || month > 12) {
        return false;
    }

    if (inputDate < today) {
        return false;
    }

    return true;
};

const validateCvv = (value: string): boolean => value.length === 3;

const validateName = (value: string): boolean => value.replace(/\s/g, '').length !== 0;

export const isInvalidInput = (name: nameType, value: string): boolean => {
    switch (name) {
        case 'ccNumber':
        case RANDOM_DATA.cardNumber.name:
            return REGEXP_NON_DDS.test(value);
        case 'ccName':
        case RANDOM_DATA.ccName.name:
            return REGEXP_LETTERS.test(value);
        case 'ccExp':
        case RANDOM_DATA.ccExp.name:
            return REGEXP_NON_DATE.test(value);
        case 'ccCsc':
        case RANDOM_DATA.ccCsc.name:
            return REGEXP_NON_DIGITS.test(value);
        default:
            return false;
    }
};

export const validate = (name: nameType, value: string): boolean => {
    switch (name) {
        case 'ccNumber':
        case RANDOM_DATA.cardNumber.name:
            return validateCreditCard(value);
        case 'ccName':
        case RANDOM_DATA.ccName.name:
            return validateName(value);
        case 'ccExp':
        case RANDOM_DATA.ccExp.name:
            return validateExp(value);
        case 'ccCsc':
        case RANDOM_DATA.ccCsc.name:
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
