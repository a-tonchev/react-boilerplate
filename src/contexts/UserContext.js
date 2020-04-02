import React, { useState, createContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';
import Loading from '../components/common/Loading';
import UserEnums from '../enums/UserEnums';
import LanguageEnums from '../enums/LanguageEnums';
import LocalStorage from '../helpers/LocalStorage';

const defaultValues = {
  userData: {
    loggedIn: false,
    isAdmin: false,
    roles: [],
    permissions: [],
  },
  language: LanguageEnums.DEFAULT,
};

const UserContext = createContext(defaultValues);

const reducer = (state, userData = {
  loggedIn: defaultValues.loggedIn,
  isAdmin: defaultValues.isAdmin,
  roles: defaultValues.roles,
  permissions: defaultValues.permissions,
}) => userData;

const UserContextProvider = ({ children }) => {
  const [userData, dispatchUserData] = React.useReducer(reducer, defaultValues.userData);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState(LanguageEnums.DEFAULT);
  const { i18n: i18nHook } = useTranslation();

  const changeLanguage = (newLang = LanguageEnums.DEFAULT) => {
    i18nHook.changeLanguage(newLang).then();
    if (newLang) LocalStorage.save('language', newLang);
    setLanguage(newLang);
  };

  const setUserData = ({
    loggedIn = false, roles = [], permissions = [],
  }) => {
    dispatchUserData({
      loggedIn,
      isAdmin: !!(roles && roles.length && roles.includes(UserEnums.ADMIN_ROLE)),
      roles,
      permissions,
    });
    setMounted(true);
  };

  const loginUser = data => {
    const {
      token, roles, permissions, language: newLang,
    } = data;
    if (token) {
      // TODO save token in localStorage or cookie
      const userDataToStore = {
        loggedIn: true,
        roles,
        permissions,
      };
      setUserData(userDataToStore);
      LocalStorage.saveObject('userData', userDataToStore);
      if (newLang) {
        changeLanguage(newLang);
      }
    }
  };

  const logoutUser = () => {
    // TODO remove token from localStorage or cookies
    dispatchUserData({
      ...defaultValues.userData,
      language: userData.language,
    });
    LocalStorage.remove('userData');
  };

  useEffect(() => {
    const storedUserData = LocalStorage.getObject('userData');
    const storedLanguage = LocalStorage.get('language');
    if (storedUserData) setUserData(storedUserData);
    if (storedLanguage) changeLanguage(storedLanguage);
    else changeLanguage();

    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return <Loading />;

  return (
    <UserContext.Provider
      value={{
        userData,
        language,
        loginUser,
        logoutUser,
        changeLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const LoginContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, LoginContextConsumer };
