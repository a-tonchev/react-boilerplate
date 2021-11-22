import { useRecoilCallback, waitForAll } from 'recoil';

import { isLoggedInStore, languageStore, userDataStore } from '@/screens/users/stores/userStore';

const LoadingContainer = ({ children }) => {
  useRecoilCallback(({ snapshot }) => async () => {
    await snapshot.getPromise(waitForAll([
      userDataStore,
      languageStore,
      isLoggedInStore,
    ]));
  })();

  return (
    <>
      {children}
    </>
  );
};

export default LoadingContainer;
