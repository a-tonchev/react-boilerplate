import { useRecoilValue, waitForAll } from 'recoil';

import { isLoggedInStore, languageStore, userDataStore } from '@/screens/users/stores/userStore';

const LoadingContainer = ({ children }) => {
  useRecoilValue(
    waitForAll([
      userDataStore,
      languageStore,
      isLoggedInStore,
    ]),
  );

  return children;
};

export default LoadingContainer;
