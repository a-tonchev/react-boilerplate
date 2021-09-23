import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomButton from '@/components/inputs/CustomButton';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
};

const ConfirmDialog = ({
  title,
  text,
  open,
  onClose,
  onConfirm,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="confirm-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text} variant="subtitle1">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => {
            onClose();
            onConfirm();
          }}
          color="primary"
          className={classes.button}
        >
          {t('yes')}
        </CustomButton>
        <CustomButton
          onClick={() => onClose()}
          color="primary"
          variant="outlined"
          className={classes.button}
        >
          {t('no')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
