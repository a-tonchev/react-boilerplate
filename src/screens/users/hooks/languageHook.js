import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  languageStore, setLanguageSelector,
} from '../stores/userStore';

export const useLanguage = () => useRecoilValue(languageStore);
export const useSetLanguage = () => useSetRecoilState(setLanguageSelector);

export default {
  useLanguage,
  useSetLanguage,
};
