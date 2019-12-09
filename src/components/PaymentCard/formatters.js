const formatCreditCard = value =>
    value
        .replace(/\s/g, '') // remove whitespace
        .slice(0, 19)
        .replace(/(\d{4})/g, '$1 ') // insert space every 4
        .replace(/(^\s+|\s+$)/, ''); // truncate sides

const formatDate = value => value.replace('/', '').replace(/(\d{2})(\d+)/, '$1/$2');

const formatName = value => value.toUpperCase();

export const format = (name, value) => {
    switch (name) {
        case 'cc-number':
            return formatCreditCard(value);
        case 'cc-name':
            return formatName(value);
        case 'cc-exp':
            return formatDate(value);
        default:
            return value;
    }
};
