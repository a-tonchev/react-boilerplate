import { CheckCircle, Close } from '@mui/icons-material';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

import { useSetSuccessSnackbar, useSuccessSnackbar } from './hooks/snackBarHooks';

const styles = {
  root: {
    bottom: 64,
    opacity: 0.95,
    width: 'calc(100% - 16px)',
    maxWidth: 'var(--theme-breakpoints-values-sm)',
    boxSizing: 'border-box',
  },
  snackBar: {
    backgroundColor: 'var(--theme-palette-success-main)',
    border: '1px solid var(--theme-palette-success-contrastText)',
    color: 'var(--theme-palette-success-contrastText)',
    width: '100%',
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'var(--theme-palette-success-contrastText)',
  },
  message: {
    display: 'inline-block',
    color: 'var(--theme-palette-success-contrastText)',
    marginLeft: 5,
  },
  snackBarMessage: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '85%',
  },
};

const SuccessSnackBar = () => {
  const classes = useClasses(styles);

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
    <IconButton onClick={onClose} size="large">
      <Close className={classes.closeButton} />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      className={classes.root}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
