import React, { useState, createContext, useEffect } from 'react';
import Loading from '../components/common/Loading';
import UserEnums from '../enums/UserEnums';

const defaultValues = {
  userData: {
    loggedIn: false,
    isAdmin: false,
    roles: [],
    permissions: [],
    language: 'en',
  },
  dispatchUserData: () => {},
};

const UserContext = createContext(defaultValues);

const reducer = (state, userData = {
  loggedIn: defaultValues.loggedIn,
  isAdmin: defaultValues.isAdmin,
  roles: defaultValues.roles,
  permissions: defaultValues.permissions,
  language: defaultValues.language,
}) => userData;

const UserContextProvider = ({ children }) => {
  const [userData, dispatchUserData] = React.useReducer(reducer, defaultValues.userData);
  const [mounted, setMounted] = useState(false);

  const setUserData = ({
    loggedIn, roles, permissions, language,
  }) => {
    dispatchUserData({
      loggedIn,
      isAdmin: roles.includes(UserEnums.ADMIN_ROLE),
      roles,
      permissions,
      language,
    });
    setMounted(true);
  };

  const setLanguage = (language) => {
    // TODO set language in localStorage
    setUserData({ ...userData, language });
  };

  const loginUser = data => {
    const {
      token, roles, permissions, language,
    } = data;
    // TODO set token in localStorage
    if (token) {
      setUserData({
        loggedIn: true, roles, permissions, language,
      });
    }
  };

  const logoutUser = () => {
    // TODO remove token and login data from localStorage (except language)
    dispatchUserData({
      ...defaultValues.userData,
      language: userData.language,
    });
  };

  useEffect(() => {
    // TODO take userData from localStorage
    const storedUserData = userData;
    setUserData(storedUserData);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return <Loading />;

  return (
    <UserContext.Provider
      value={{
        userData,
        loginUser,
        logoutUser,
        setLanguage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const LoginContextConsumer = UserContext.Consumer;

export { UserContext, UserContextProvider, LoginContextConsumer };
