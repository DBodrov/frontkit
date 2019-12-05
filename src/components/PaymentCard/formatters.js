export const formatCreditCard = value => value
  .replace(/\s/g, '') // remove whitespace
  .slice(0, 19)
  .replace(/(\d{4})/g, '$1 ') // insert space every 4
  .replace(/(^\s+|\s+$)/, ''); // truncate sides

export const formatDate = value => value
  .replace('/', '')
  .replace(/(\d{2})(\d+)/, '$1/$2');

export const formatName = value => value.toUpperCase();

export const formatPhone = value => value
  .replace(/^8/, '')
  .replace(/.+?\(/, '+7 (') // replace all before (
  .replace('+7 (7', '+7 (')
  .replace(/\+7|7?/, '') // remove first +7 || 7
  .replace(/[^0-9]/g, '') // only digits
  .slice(0, 10)
  .replace(/(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/, '+7 ($1) $2 $3 $4') // add +7()--
  .replace(/(\) --)|(--?)$/, '') // truncate
  .replace(/  +/g, ' ');

export const formatMobile = number =>
  number
    .replace(/[^0-9]/g, '')
    .replace(/^[7,8]/, '')
    .substring(0, 10);
