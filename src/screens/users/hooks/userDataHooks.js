import { useStoreValue } from '@/components/state/GlobalState';

import {
  UserStores,
} from '../stores/userStore';

export const useUserData = () => useStoreValue(UserStores.userDataStore);

// User roles and permissions
export const useLoggedIn = () => useStoreValue(UserStores.isLoggedInStore);

export const useIsAdmin = () => useStoreValue(UserStores.isAdminStore);

// User redirects
/**  @return string */
export const useRedirected = () => useStoreValue(UserStores.redirectedFromStore);

export default {
  useUserData,
  useIsAdmin,
};
