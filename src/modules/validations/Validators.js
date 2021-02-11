import UrlHelper from '../connections/UrlHelper';

export default {
  isEmail(email) {
    return email && !!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
  },
  isEmpty(field) {
    return field && field.length;
  },
  isBoolean(field) {
    return typeof field === 'boolean';
  },
  isPassword(field) {
    return field && field.length >= 8;
  },
  isTrue(field) {
    return !!field;
  },
  isName(name) {
    return name && name.length && name.length >= 2;
  },
  isAddress(name) {
    return name && name.length && name.length > 5;
  },
  isCountry(name) {
    return name
      && name.length
      && (name.length === 2 || name.length === 3);
  },
  isUrl(field) {
    return UrlHelper.isUrl(field);
  },
  isUrlWithRelative(field) {
    if (field && field[0] === '/') return true;
    return UrlHelper.isUrl(field);
  },
  isZip(field) {
    return field && field.length > 2;
  },
  isAlphaNumeric(field) {
    return field && !!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(field));
  },
  isPhone(phone) {
    return !!parseInt(phone);
  },
};
