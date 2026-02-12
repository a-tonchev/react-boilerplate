import { useSetStoreValue, useStoreValue } from '@/components/state/GlobalState';

import { SnackBarStores } from '../stores/snackbarStore';

export const useSetSuccessSnackbar = () => useSetStoreValue(SnackBarStores.successSnackbarStore);

export const useSuccessSnackbar = () => useStoreValue(SnackBarStores.successSnackbarStore);

export const useSetErrorSnackbar = () => useSetStoreValue(SnackBarStores.errorSnackbarStore);

export const useErrorSnackbar = () => useStoreValue(SnackBarStores.errorSnackbarStore);

export default {};
