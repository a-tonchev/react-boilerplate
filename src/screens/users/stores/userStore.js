import {
  atom,
  selector,
} from 'recoil';

import BasicConfig from '@/components/config/BasicConfig';
import tokenStore from '@/components/connections/stores/tokenStore';
import i18n from '@/components/translations/i18n';
import Storage from '@/components/storage/Storage';
import StorageEnums from '@/components/storage/enums/StorageEnums';

import { UserRoles } from '../enums/UserEnums';

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

export const userDataStore = atom({
  key: 'userDataStore',
  default: selector({
    key: 'userDataStore/default',
    get: async () => {
      const storedUserData = await Storage.getObject(StorageEnums.userData);
      return storedUserData || defaultUserData;
    },
  }),
});

export const languageStore = atom({
  key: 'languageStore',
  default: selector({
    key: 'languageStore/default',
    get: async () => {
      const storedData = await Storage.get(StorageEnums.language);
      if (storedData && i18n.language !== storedData) {
        i18n.changeLanguage(storedData).then();
      }
      return storedData || BasicConfig.localizations.defaultLanguage;
    },
  }),
});

export const setLanguageSelector = selector({
  key: 'setLanguageSelector',
  get: ({ get }) => get(languageStore),
  set: ({ get, set }, language) => {
    const oldLanguage = get(languageStore);

    if (
      language
      && BasicConfig.localizations.availableLanguages.includes(language)
      && language !== oldLanguage
    ) {
      set(languageStore, language);
      changeLanguage(language);
    }
  },
});

export const redirectedFromStore = atom({
  key: 'redirectedFromStore',
  default: '',
});

export const isAdminStore = atom({
  key: 'isAdminStore',
  default: selector({
    key: 'isAdminStore/default',
    get: ({ get }) => {
      const userData = get(userDataStore);
      const { roles } = userData;
      return !!(roles && roles.length && roles.includes(UserRoles.ADMIN_ROLE));
    },
  }),
});

export const isLoggedInStore = atom({
  key: 'isLoggedInStore',
  default: selector({
    key: 'isLoggedInStore/default',
    get: async () => {
      const storedData = await tokenStore.restoreFromSession();
      return !!storedData;
    },
  }),
});

export const setUserDataSelector = selector({
  key: 'setUserDataSelector',
  get: ({ get }) => get(userDataStore),
  set: ({ get, set }, userDataObject = {}) => {
    const oldUserData = get(userDataStore);
    const oldIsAdmin = get(isAdminStore);

    const newUserData = {
      ...oldUserData,
      ...userDataObject,
    };
    const { roles } = newUserData;

    set(userDataStore, newUserData);
    const isAdmin = !!(roles && roles.length && roles.includes(UserRoles.ADMIN_ROLE));

    if (isAdmin !== oldIsAdmin) {
      set(isAdminStore, isAdmin);
    }
    Storage.saveObject(StorageEnums.userData, newUserData).then();
  },
});

export const loginUserSelector = selector({
  key: 'loginUserSelector',
  get: ({ get }) => get(userDataStore),
  set: ({ set }, { token, redirectedFrom, ...userData }) => {
    if (token) {
      tokenStore.set(token);
      set(isLoggedInStore, true);
      set(redirectedFromStore, redirectedFrom);
      set(setUserDataSelector, {
        ...userData,
      });
    }
  },
});

export const logoutUserDataSelector = selector({
  key: 'logoutUserDataSelector',
  get: ({ get }) => get(userDataStore),
  set: ({ set }) => {
    set(userDataStore, defaultUserData);
    set(isAdminStore, false);
    set(isLoggedInStore, false);
    Storage.remove(StorageEnums.userData).then();
  },
});

export default {};
