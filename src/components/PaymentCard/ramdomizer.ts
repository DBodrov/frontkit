export const getRandomInt = (_min: number, _max: number) => {
    const min = Math.ceil(_min);
    const max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeId = (length: number) => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
};

const ccNumberPlaceholders = [
    '0000 0000 0000 0000',
    `0000 ${getRandomInt(1111, 9999)} ${getRandomInt(1111, 9999)} ${getRandomInt(1111, 9999)}`,
    'Введите номер карты',
    'Номер карты',
];

const ccNamePlaceholders = ['Владелец карты', 'Держатель карты', 'Card Holder', 'CardHolder', 'CARD HOLDER'];

const ccExpPlaceholders = ['ММ/ГГ', 'мм/гг', 'месяц/год'];

const ccCscPlaceholders = ['CVV/CVC', 'CVV', 'CVC', 'CVV2/CVC2', 'CVV2', 'CVC2'];

export const DEFAULT_DATA = {
    cardNumber: {
        name: 'ccNumber',
        placeholderText: 'Номер карты',
        autoComplete: 'cc-number',
    },
    ccName: {
        name: 'ccName',
        placeholderText: 'Владелец карты',
        autoComplete: 'cc-name',
    },
    ccExp: {
        name: 'ccExp',
        placeholderText: 'ММ/ГГ',
        autoComplete: 'cc-exp',
    },
    ccCsc: {
        name: 'ccCsc',
        placeholderText: 'CVV/CVC',
        autoComplete: 'cc-csc',
    },
};

export const RANDOM_DATA = {
    cardNumber: {
        name: makeId(7),
        placeholderText: ccNumberPlaceholders[getRandomInt(0, ccNumberPlaceholders.length - 1)],
        autoComplete: 'off',
    },
    ccName: {
        name: makeId(7),
        placeholderText: ccNamePlaceholders[getRandomInt(0, ccNamePlaceholders.length - 1)],
        autoComplete: 'off',
    },
    ccExp: {
        name: makeId(7),
        placeholderText: ccExpPlaceholders[getRandomInt(0, ccExpPlaceholders.length - 1)],
        autoComplete: 'off',
    },
    ccCsc: {
        name: makeId(7),
        placeholderText: ccCscPlaceholders[getRandomInt(0, ccCscPlaceholders.length - 1)],
        autoComplete: 'off',
    },
};

export const getCardData = (needRandom: boolean) => (needRandom ? RANDOM_DATA : DEFAULT_DATA);
