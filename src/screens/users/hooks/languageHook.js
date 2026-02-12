import { useStoreValue } from '@/components/state/GlobalState';

import {
  UserStores,
} from '../stores/userStore';

export const useLanguage = () => useStoreValue(UserStores.languageStore);

export default {
  useLanguage,
};
