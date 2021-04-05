import LocalStorage from '../../storage/LocalStorage';
import StorageEnums from '../../storage/enums/StorageEnums';
import StringHelper from '../../helpers/StringHelper';

let token = '';

const tokenStore = {
  set(newToken) {
    token = newToken;
    LocalStorage.save(
      StorageEnums.token,
      StringHelper.encode(newToken),
    ).then();
  },

  get() {
    return token;
  },

  remove() {
    token = '';
    LocalStorage.remove(StorageEnums.token).then();
  },

  async restoreFromSession() {
    const storedToken = await LocalStorage.get(StorageEnums.token) || '';
    token = storedToken ? StringHelper.decode(storedToken) : '';
    return token;
  },
};

export default tokenStore;
