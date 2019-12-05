export const REGEXP_NON_DDS = /[^0-9-\s]+/;
export const REGEXP_NON_DATE = /[^0-9/]+/;
export const REGEXP_NON_PHONE = /[^0-9+\-\s()]/;
export const REGEXP_NON_LATIN = /[^a-zA-Z' ]+/;
export const REGEXP_NON_DIGITS = /[^0-9]+/;
export const REGEXP_NON_EMAIL = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;

export const validateCreditCard = (value) => {
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

export const validatePhone = value =>
  value
    .slice(2)
    .replace(/[^0-9]/g, '')
    .length === 10;

export const validateExp = value => value
  .replace(/[^0-9]/g, '')
  .length === 4;

export const validateCvv = value => value.length > 0;

export const validateName = value => value
  .replace(/\s/g, '')
  .length !== 0;

export const validateEmail = value => !(value === '' || value.indexOf('@') === -1);
