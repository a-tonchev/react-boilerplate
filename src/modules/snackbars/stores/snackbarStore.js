import {
  atom,
} from 'recoil';

export const successSnackbarStore = atom({
  key: 'successSnackbarStore',
  default: {
    open: false,
    message: '',
  },
});

export const errorSnackbarStore = atom({
  key: 'errorSnackbarStore',
  default: {
    open: false,
    message: '',
  },
});

export default {};
