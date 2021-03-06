import { CheckCircle, Close } from '@material-ui/icons';
import React from 'react';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSetSuccessSnackbar, useSuccessSnackbar } from './hooks/snackBarHooks';

const useStyles = makeStyles(theme => ({
  root: {
    bottom: 64,
    opacity: 0.95,
    width: 'calc(100% - 16px)',
    maxWidth: theme.breakpoints.values.sm,
    boxSizing: 'border-box',
  },
  snackBar: {
    backgroundColor: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.contrastText}`,
    color: theme.palette.success.contrastText,
    width: '100%',
    fontWeight: 'bold',
  },
  closeButton: {
    color: theme.palette.success.contrastText,
  },
  message: {
    display: 'inline-block',
    marginLeft: 5,
  },
  snackBarMessage: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '85%',
  },
}));

const SuccessSnackBar = () => {
  const classes = useStyles();

  const successSnackBar = useSuccessSnackbar();
  const setSuccessSnackBar = useSetSuccessSnackbar();
  const { open, message = '' } = successSnackBar;

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackBar({
      message: '',
      open: false,
    });
  };

  const action = (
    <IconButton onClick={onClose}>
      <Close className={classes.closeButton} />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      className={classes.root}
    >
      <SnackbarContent
        message={(
          <>
            <CheckCircle />
            <Typography className={classes.message}>{message}</Typography>
          </>
        )}
        className={classes.snackBar}
        classes={{
          message: classes.snackBarMessage,
        }}
        action={action}
      />
    </Snackbar>
  );
};

export default SuccessSnackBar;
