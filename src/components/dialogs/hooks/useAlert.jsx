import { useState } from 'react';

import AlertDialog from '../AlertDialog';
import AlertSnackBar from '../snackbars/AlertSnackBar';

const useAlert = (type = 'modal') => {
  const [dialog, setDialog] = useState({
    open: false,
    text: '',
  });

  const closeDialog = () => {
    setDialog({
      ...dialog,
      open: false,
    });
  };

  const onOpenDialog = () => {
    setDialog({
      ...dialog,
      open: true,
    });
  };

  const openDialog = (text = '') => {
    setDialog({
      text,
      open: true,
    });
  };

  const Dialog = type === 'snackbar'
    ? (
      <AlertSnackBar
        open={dialog.open}
        text={dialog.text}
        onClose={closeDialog}
      />
    )
    : (
      <AlertDialog
        open={dialog.open}
        text={dialog.text}
        onClose={closeDialog}
      />
    );

  return {
    openDialog,
    onOpenDialog,
    AlertDialog: Dialog,
  };
};

export default useAlert;
