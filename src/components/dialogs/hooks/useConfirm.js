import React, { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog';
import ConfirmSnackBar from '../../snackbars/ConfirmSnackBar';

const useConfirm = (type = 'modal') => {
  const [dialog, setDialog] = useState({
    open: false,
    text: 'Are you sure?',
    callback: () => {},
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

  const openDialog = (text = '', callback = () => {}) => {
    setDialog({
      callback,
      text,
      open: true,
    });
  };

  const Dialog = type === 'snackbar'
    ? (
      <ConfirmSnackBar
        open={dialog.open}
        text={dialog.text}
        onConfirm={dialog.callback}
        onClose={closeDialog}
      />
    )
    : (
      <ConfirmDialog
        open={dialog.open}
        text={dialog.text}
        onConfirm={dialog.callback}
        onClose={closeDialog}
      />
    );

  return {
    openDialog,
    onOpenDialog,
    ConfirmDialog: Dialog,
  };
};

export default useConfirm;
