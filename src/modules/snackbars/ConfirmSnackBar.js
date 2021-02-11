import React from 'react';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import {
  Info,
  Check,
  Close,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    bottom: 64,
    opacity: 0.95,
    width: 'calc(100% - 16px)',
    maxWidth: theme.breakpoints.values.sm,
    boxSizing: 'border-box',
  },
  snackBar: {
    width: '100%',
    fontWeight: 'bold',
    flexWrap: 'nowrap',
  },
  closeButton: {
    color: 'inherit',
  },
  message: {
    display: 'inline-block',
    marginLeft: 15,
  },
  snackBarMessage: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ConfirmSnackBar = ({
  open,
  text,
  onConfirm,
  onClose,
}) => {
  const classes = useStyles();

  const closeSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  const action = (
    <>
      <IconButton
        className={classes.closeButton}
        onClick={() => {
          onClose();
          onConfirm();
        }}
      >
        <Check />
      </IconButton>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <Close />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      onClose={closeSnackBar}
      className={classes.root}
    >
      <SnackbarContent
        message={(
          <>
            <Info />
            <Typography className={classes.message}>{text}</Typography>
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

export default ConfirmSnackBar;
