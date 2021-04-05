import {
  useSetSuccessSnackbar,
  useSetErrorSnackbar,
} from './snackBarHooks';

const useSnackbar = () => {
  const setSuccessSnackbar = useSetSuccessSnackbar();
  const setErrorSnackbar = useSetErrorSnackbar();

  const createSuccessSnackbar = (message = '') => {
    setSuccessSnackbar({
      message,
      open: true,
    });
  };

  const createErrorSnackbar = (message = '') => {
    setErrorSnackbar({
      message,
      open: true,
    });
  };

  return {
    createSuccessSnackbar,
    createErrorSnackbar,
  };
};

export default useSnackbar;
