import { useState } from 'react';

import ValuesDialog from '../ValuesDialog';

const useValuesDialog = () => {
  const [dialog, setDialog] = useState({
    open: false,
    text: '',
    title: '',
    defaultValues: {},
    inputs: [],
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
      title = '',
      defaultValues = {},
      inputs = [],
    },
    callback = () => {},
  ) => {
    setDialog({
      callback,
      text,
      title,
      open: true,
      defaultValues,
      inputs,
    });
  };

  return {
    openDialog,
    onOpenDialog,
    ValuesDialog: <ValuesDialog
      defaultValues={dialog.defaultValues}
      inputs={dialog.inputs}
      open={dialog.open}
      text={dialog.text}
      title={dialog.title}
      onSave={dialog.callback}
      onClose={closeDialog}
    />,
  };
};

export default useValuesDialog;
