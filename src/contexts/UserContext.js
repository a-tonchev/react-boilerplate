import React, { createContext, useEffect } from 'react';
import i18n from '../translations/i18n';
import Loading from '../components/common/loading/Loading';
import UserEnums from '../enums/UserEnums';
import LanguageEnums from '../enums/LanguageEnums';
import LocalStorage from '../helpers/LocalStorage';

const defaultValues = {
  loggedIn: false,
  isAdmin: false,
  roles: [],
  permissions: [],
  language: LanguageEnums.DEFAULT,
  mounted: false,
};

const UserContext = createContext(defaultValues);

const changeLanguage = (language, oldLanguage) => {
  if (language !== oldLanguage) {
    i18n.changeLanguage(language).then();
    LocalStorage.save('language', language);
  }
};

function reducer(state, action) {
  const { type, ...userData } = action;

  switch (type) {
    case 'SET_USER_DATA': {
      const { roles, language } = userData;
      changeLanguage(language, state.language);
      return {
        ...state,
        ...userData,
        isAdmin: !!(roles && roles.length && roles.includes(UserEnums.ADMIN_ROLE)),
        mounted: true,
      };
    }
    case 'LOGIN_USER': {
      const {
        roles,
        token,
      } = userData;
      if (token) {
        // TODO save token in localStorage or cookie
        const userDataToStore = {
          ...state,
          ...userData,
          loggedIn: true,
          isAdmin: !!(roles && roles.length && roles.includes(UserEnums.ADMIN_ROLE)),
          language: userData.language || state.language,
        };
        LocalStorage.saveObject('userData', userDataToStore);
        LocalStorage.save('language', userDataToStore.language);
        return {
          ...userDataToStore,
        };
      }
      return {
        ...state,
      };
    }
    case 'LOGOUT_USER': {
      LocalStorage.remove('userData');
      const { language, mounted, ...rest } = defaultValues;
      return {
        ...state,
        ...rest,
        language,
      };
    }
    case 'CHANGE_LANGUAGE': {
      const {
        language,
      } = userData;
      changeLanguage(language, state.language);
      return {
        ...state,
        language: language || state.language,
      };
    }
    default:
      return {
        ...state,
        ...userData,
      };
  }
}

const UserContextProvider = ({ children }) => {
  const [userData, dispatchUserData] = React.useReducer(reducer, defaultValues);

  const { mounted, language } = userData;

  useEffect(() => {
    const storedUserData = LocalStorage.getObject('userData') || defaultValues;
    const storedLanguage = LocalStorage.get('language');
    dispatchUserData({
      ...storedUserData,
      language: storedLanguage || LanguageEnums.DEFAULT,
      type: 'SET_USER_DATA',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return <Loading />;

  return (
    <UserContext.Provider
      value={{
        userData,
        language,
        dispatchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const LoginContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, LoginContextConsumer };
