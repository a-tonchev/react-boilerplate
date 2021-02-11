export default class LocalStorage {
  static save(field, value) {
    localStorage.setItem(field, value);
  }

  static get(field) {
    const lsItem = localStorage.getItem(field);
    if (lsItem) return lsItem;
  }

  static getObject(field) {
    const lsItem = localStorage.getItem(field);
    if (lsItem) return JSON.parse(lsItem);
  }

  static saveObject(field, object) {
    localStorage.setItem(field, JSON.stringify(object));
  }

  static remove(field) {
    localStorage.removeItem(field);
  }

  static clear() {
    localStorage.clear();
  }
}
