import { useEffect, useState } from 'react';

import ConfirmSnackBar from '@/components/dialogs/snackbars/ConfirmSnackBar';

import ConfirmDialog from '../ConfirmDialog';

const defaultDialog = {
  open: false,
  text: '',
  callback: () => {},
  resolve: null,
};

const useConfirm = (type = 'modal') => {
  const [dialog, setDialog] = useState(defaultDialog);

  useEffect(() => () => {
    if (dialog.resolve) dialog.resolve(false);
  }, [dialog]);

  const closeDialog = confirm => {
    if (dialog.resolve && !confirm) dialog.resolve();
    setDialog({
      ...defaultDialog,
    });
  };

  const openDialog = (text = '', callback = () => {}) => new Promise(resolve => {
    setDialog({
      open: true,
      text,
      callback,
      resolve,
    });
  });

  const onConfirm = () => {
    dialog.callback && dialog.callback();
    dialog.resolve && dialog.resolve(true);
  };

  const Dialog = type === 'snackbar'
    ? (
      <ConfirmSnackBar
        open={dialog.open}
        text={dialog.text}
        onConfirm={onConfirm}
        onClose={closeDialog}
      />
    )
    : (
      <ConfirmDialog
        open={dialog.open}
        text={dialog.text}
        onConfirm={onConfirm}
        onClose={closeDialog}
      />
    );

  return {
    openDialog,
    ConfirmDialog: Dialog,
  };
};

export default useConfirm;
