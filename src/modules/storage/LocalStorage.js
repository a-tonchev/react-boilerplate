import localForage from 'localforage';

localForage.config({
  name: 'just-sell',
});

export default class LocalStorage {
  static async save(field, value) {
    return localForage.setItem(field, value);
  }

  static async get(field) {
    return localForage.getItem(field);
  }

  static async getObject(field) {
    return localForage.getItem(field);
  }

  static async saveObject(field, object) {
    return localForage.setItem(field, object);
  }

  static async remove(field) {
    return localForage.removeItem(field);
  }

  static async clear() {
    return localForage.clear();
  }

  static async getSessionItem(field) {
    return new Promise((resolve) => {
      const item = sessionStorage.getItem(field);
      resolve(item || '');
    });
  }

  static async setSessionItem(field, value) {
    return new Promise((resolve) => {
      sessionStorage.setItem(field, value);
      resolve(field);
    });
  }

  static async removeSessionItem(field) {
    sessionStorage.removeItem(field);
  }
}
