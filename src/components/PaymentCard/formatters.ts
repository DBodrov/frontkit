import { RANDOM_DATA } from './ramdomizer';

const formatCreditCard = (value: string): string =>
    value
        .replace(/\s/g, '') // remove whitespace
        .slice(0, 19)
        .replace(/(\d{4})/g, '$1 ') // insert space every 4
        .replace(/(^\s+|\s+$)/, ''); // truncate sides

const formatDate = (value: string): string => value.replace('/', '').replace(/(\d{2})(\d+)/, '$1/$2');

const LETTERS = {
    Й: 'Q',
    Ц: 'W',
    У: 'E',
    К: 'R',
    Е: 'T',
    Н: 'Y',
    Г: 'U',
    Ш: 'I',
    Щ: 'O',
    З: 'P',
    Ф: 'A',
    Ы: 'S',
    В: 'D',
    А: 'F',
    П: 'G',
    Р: 'H',
    О: 'J',
    Л: 'K',
    Д: 'L',
    Я: 'Z',
    Ч: 'X',
    С: 'C',
    М: 'V',
    И: 'B',
    Т: 'N',
    Ь: 'M',
};

const formatName = (value: string): string => {
    function toEngLetter(match: string): string {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return LETTERS[match] || '';
    }
    return value.toUpperCase().replace(/[А-Я]/g, toEngLetter);
};

export const format = (name: string, value: string): string => {
    switch (name) {
        case 'ccNumber':
        case RANDOM_DATA.cardNumber.name:
            return formatCreditCard(value);
        case 'ccName':
        case RANDOM_DATA.ccName.name:
            return formatName(value);
        case 'ccExp':
        case RANDOM_DATA.ccExp.name:
            return formatDate(value);
        default:
            return value;
    }
};
