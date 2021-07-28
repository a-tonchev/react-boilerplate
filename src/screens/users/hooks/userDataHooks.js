import { useSetRecoilState, useRecoilValue } from 'recoil';

import {
  userDataStore,
  loginUserSelector,
  logoutUserDataSelector,
  setUserDataSelector,
  isLoggedInStore,
  isAdminStore,
  redirectedFromStore,
} from '../stores/userStore';

// User data actions
export const useUpdateUserData = () => useSetRecoilState(setUserDataSelector);

export const useLogoutUser = () => useSetRecoilState(logoutUserDataSelector);

export const useLoginUser = () => useSetRecoilState(loginUserSelector);

export const useUserData = () => useRecoilValue(userDataStore);

// User roles and permissions
export const useLoggedIn = () => useRecoilValue(isLoggedInStore);

export const useIsAdmin = () => useRecoilValue(isAdminStore);

// User redirects
export const useRedirected = () => useRecoilValue(redirectedFromStore);

export const useSetRedirected = () => useSetRecoilState(redirectedFromStore);

export default {
  useUpdateUserData,
  useLogoutUser,
  useLoginUser,
  useUserData,
  useIsAdmin,
};
