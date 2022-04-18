import { useCallback } from 'react';

import {
  useSetSuccessSnackbar,
  useSetErrorSnackbar,
} from './snackBarHooks';

const useSnackbar = () => {
  const setSuccessSnackbar = useSetSuccessSnackbar();
  const setErrorSnackbar = useSetErrorSnackbar();

  const createSuccessSnackbar = useCallback((message = '') => {
    setSuccessSnackbar({
      message,
      open: true,
    });
  }, [setSuccessSnackbar]);

  const createErrorSnackbar = useCallback((message = '') => {
    setErrorSnackbar({
      message,
      open: true,
    });
  }, [setErrorSnackbar]);

  return {
    createSuccessSnackbar,
    createErrorSnackbar,
  };
};

export default useSnackbar;
