import { atom, useAtomValue } from 'jotai';

import GlobalStore from '@/components/state/GlobalStore';
import {
  UserStores,
} from '@/screens/users/stores/userStore';
import Loading from '@/components/loading/Loading';

export const prioLoadedSetAtom = atom(false);

export const usePrioLoadedSet = () => useAtomValue(prioLoadedSetAtom);

Promise.all([
  UserStores.isLoggedInStore.promise,
  UserStores.userDataStore.promise,
  UserStores.languageStore.promise,
]).then(() => {
  GlobalStore.set(prioLoadedSetAtom, true);
});

const LoadingContainer = ({ children }) => {
  const prioLoaded = usePrioLoadedSet();

  if (!prioLoaded) return <Loading />;

  return children;
};

export default LoadingContainer;
