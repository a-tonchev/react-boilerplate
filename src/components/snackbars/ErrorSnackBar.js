import { Close, Error } from '@material-ui/icons';
import React from 'react';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  useErrorSnackbar,
  useSetErrorSnackbar,
} from './hooks/snackBarHooks';

const useStyles = makeStyles(theme => ({
  root: {
    bottom: 64,
    opacity: 0.95,
    width: 'calc(100% - 16px)',
    maxWidth: theme.breakpoints.values.sm,
    boxSizing: 'border-box',
  },
  snackBar: {
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.contrastText}`,
    color: theme.palette.error.contrastText,
    width: '100%',
    fontWeight: 'bold',
  },
  closeButton: {
    color: theme.palette.error.contrastText,
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

const ErrorSnackBar = () => {
  const classes = useStyles();

  const errorSnackbar = useErrorSnackbar();
  const setErrorSnackBar = useSetErrorSnackbar();
  const { open, message = '' } = errorSnackbar;

  const onClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorSnackBar({
      open: false,
      message: '',
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
            <Error />
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

export default ErrorSnackBar;
