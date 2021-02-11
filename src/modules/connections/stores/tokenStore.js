import LocalStorage from '../../storage/LocalStorage';
import StorageEnums from '../../storage/enums/StorageEnums';
import StringHelper from '../../helpers/StringHelper';

let token = '';

class tokenStore {
  static set(newToken) {
    token = newToken;
    LocalStorage.save(
      StorageEnums.token,
      StringHelper.encode(newToken),
    ).then();
  }

  static get() {
    return token;
  }

  static remove() {
    token = '';
    LocalStorage.remove(StorageEnums.token).then();
  }

  static async restoreFromSession() {
    const storedToken = await LocalStorage.get(StorageEnums.token) || '';
    token = storedToken ? StringHelper.decode(storedToken) : '';
    return token;
  }
}

export default tokenStore;
