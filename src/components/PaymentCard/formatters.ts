const formatCreditCard = (value: string): string =>
    value
        .replace(/\s/g, '') // remove whitespace
        .slice(0, 19)
        .replace(/(\d{4})/g, '$1 ') // insert space every 4
        .replace(/(^\s+|\s+$)/, ''); // truncate sides

const formatDate = (value: string): string => value.replace('/', '').replace(/(\d{2})(\d+)/, '$1/$2');

const formatName = (value: string): string => value.toUpperCase();

export const format = (name: string, value: string): string => {
    switch (name) {
        case 'ccNumber':
            return formatCreditCard(value);
        case 'ccName':
            return formatName(value);
        case 'ccExp':
            return formatDate(value);
        default:
            return value;
    }
};
