import BasicConfig from '@/components/config/BasicConfig';
import tokenStore from '@/components/connections/stores/tokenStore';
import i18n from '@/components/translations/i18n';
import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';
import GlobalStateHelper from '@/components/state/GlobalStateHelper';

import { UserRoles } from '../enums/UserEnums';

export const UserStores = {
  languageStore: null,
  userDataStore: null,
  redirectedFromStore: null,
  isAdminStore: null,
  isLoggedInStore: null,
};

const defaultUserData = {
  loggedIn: false,
  roles: [],
  permissions: [],
  profile: {},
  userHash: '',
};

const changeLanguage = language => {
  i18n.changeLanguage(language).then();
  Storage.save(StorageEnums.language, language).then();
};

GlobalStateHelper.atom({
  key: 'userDataStore',
  default: async () => {
    const storedUserData = await Storage.getObject(StorageEnums.userData);
    return storedUserData || defaultUserData;
  },
  type: 'async',
  store: UserStores,
  dependencies: [],
});

GlobalStateHelper.atom({
  key: 'languageStore',
  default: async () => {
    const storedData = await Storage.get(StorageEnums.language);
    if (storedData && i18n.language !== storedData) {
      changeLanguage(storedData);
    }
    return storedData || BasicConfig.localizations.defaultLanguage;
  },
  type: 'async',
  store: UserStores,
  dependencies: [],
});

export const setLanguage = language => {
  const oldLanguage = UserStores.languageStore.get();

  if (
    language
    && BasicConfig.localizations.availableLanguages.includes(language)
    && language !== oldLanguage
  ) {
    UserStores.languageStore.set(language);
    changeLanguage(language);
  }
};

GlobalStateHelper.atom({
  key: 'redirectedFromStore',
  default: '',
  store: UserStores,
});

GlobalStateHelper.atom({
  key: 'isAdminStore',
  default: () => {
    const userData = UserStores.userDataStore.get();
    const { roles } = userData;
    return !!(roles && roles.length && roles.includes(UserRoles.ADMIN_ROLE));
  },
  store: UserStores,
  dependencies: [UserStores.userDataStore],
});

GlobalStateHelper.atom({
  key: 'isLoggedInStore',
  default: async () => {
    const storedData = await tokenStore.restoreFromSession();
    return !!storedData;
  },
  type: 'async',
  store: UserStores,
});

export const setUserData = (userDataObject = {}) => {
  const oldUserData = UserStores.userDataStore.get();
  const oldIsAdmin = UserStores.isAdminStore.get();

  const newUserData = {
    ...oldUserData,
    ...userDataObject,
  };
  const { roles } = newUserData;

  UserStores.userDataStore.set(newUserData);

  const isAdmin = !!(roles && roles.length && roles.includes(UserRoles.ADMIN_ROLE));

  if (isAdmin !== oldIsAdmin) {
    UserStores.isAdminStore.set(isAdmin);
  }
  Storage.saveObject(StorageEnums.userData, newUserData).then();
};

export const loginUser = ({ token, redirectedFrom, ...userData }) => {
  if (token) {
    tokenStore.set(token);
    UserStores.isLoggedInStore.set(true);
    UserStores.redirectedFromStore.set(redirectedFrom);
    setUserData({
      ...userData,
    });
  }
};

export const logoutUser = async () => {
  UserStores.userDataStore.set(defaultUserData);
  UserStores.isAdminStore.set(false);
  UserStores.isLoggedInStore.set(false);
  await Storage.remove(StorageEnums.userData);
  await Storage.remove(StorageEnums.token);
};

export default {};
