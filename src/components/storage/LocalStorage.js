import localForage from 'localforage';

localForage.config({
  name: 'project-storage-name',
});

const LocalStorage = {
  async save(field, value) {
    return localForage.setItem(field, value);
  },

  async get(field) {
    return localForage.getItem(field);
  },

  async getObject(field) {
    return localForage.getItem(field);
  },

  async saveObject(field, object) {
    return localForage.setItem(field, object);
  },

  async remove(field) {
    return localForage.removeItem(field);
  },

  async clear() {
    return localForage.clear();
  },

  async getSessionItem(field) {
    return new Promise(resolve => {
      const item = sessionStorage.getItem(field);
      resolve(item || '');
    });
  },

  async setSessionItem(field, value) {
    return new Promise(resolve => {
      sessionStorage.setItem(field, value);
      resolve(field);
    });
  },

  async removeSessionItem(field) {
    sessionStorage.removeItem(field);
  },
};

export default LocalStorage;
