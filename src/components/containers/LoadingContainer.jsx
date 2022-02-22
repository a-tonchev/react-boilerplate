import { useRecoilValue, waitForAll } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { isLoggedInStore, languageStore, userDataStore } from '@/screens/users/stores/userStore';

const NavigateSetter = () => {
  History.navigate = useNavigate();

  return null;
};

const LoadingContainer = ({ children }) => {
  useRecoilValue(
    waitForAll([
      userDataStore,
      languageStore,
      isLoggedInStore,
    ]),
  );

  return (
    <>
      <NavigateSetter />
      {children}
    </>
  );
};

export default LoadingContainer;
