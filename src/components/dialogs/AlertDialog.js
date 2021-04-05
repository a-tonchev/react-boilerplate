import React from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CustomButton from '../inputs/CustomButton';

const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
}));

const AlertDialog = ({
  title,
  text,
  open,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text} variant="subtitle1">
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => {
            onClose();
          }}
          color="primary"
          className={classes.button}
        >
          {t('ok')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
