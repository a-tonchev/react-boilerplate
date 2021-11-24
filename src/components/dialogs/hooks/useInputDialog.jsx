import { useState } from 'react';

import InputDialog from '../InputDialog';

const useInputDialog = () => {
  const [dialog, setDialog] = useState({
    open: false,
    name: '',
    text: '',
    label: '',
    title: '',
    type: 'text',
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

  const openDialog = (
    {
      text = '',
      label = '',
      title = '',
      name = '',
      type = 'text',
    },
    callback = () => {},
  ) => {
    setDialog({
      callback,
      text,
      label,
      title,
      type,
      name,
      open: true,
    });
  };

  return {
    openDialog,
    onOpenDialog,
    InputDialog: <InputDialog
      open={dialog.open}
      text={dialog.text}
      label={dialog.label}
      name={dialog.name}
      title={dialog.title}
      onSave={dialog.callback}
      onClose={closeDialog}
    />,
  };
};

export default useInputDialog;
