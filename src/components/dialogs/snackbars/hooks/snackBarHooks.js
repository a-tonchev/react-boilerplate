import { useSetRecoilState, useRecoilValue } from 'recoil';

import { errorSnackbarStore, successSnackbarStore } from '../stores/snackbarStore';

export const useSetSuccessSnackbar = () => useSetRecoilState(successSnackbarStore);

export const useSuccessSnackbar = () => useRecoilValue(successSnackbarStore);

export const useSetErrorSnackbar = () => useSetRecoilState(errorSnackbarStore);

export const useErrorSnackbar = () => useRecoilValue(errorSnackbarStore);

export default {
  useSetSuccessSnackbar,
  useSuccessSnackbar,
  useSetErrorSnackbar,
  useErrorSnackbar,
};
