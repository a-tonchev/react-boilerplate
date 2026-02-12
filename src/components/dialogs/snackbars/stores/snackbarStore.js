import GlobalStateHelper from '@/components/state/GlobalStateHelper';

export const SnackBarStores = {
  successSnackbarStore: null,
  errorSnackbarStore: null,
};

GlobalStateHelper.atom({
  key: 'successSnackbarStore',
  default: {
    open: false,
    message: '',
  },
  store: SnackBarStores,
});

GlobalStateHelper.atom({
  key: 'errorSnackbarStore',
  default: {
    open: false,
    message: '',
  },
  store: SnackBarStores,
});

export default {};
