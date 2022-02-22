import { Close, Error } from '@mui/icons-material';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

import {
  useErrorSnackbar,
  useSetErrorSnackbar,
} from './hooks/snackBarHooks';

const styles = {
  root: {
    bottom: 64,
    opacity: 0.95,
    width: 'calc(100% - 16px)',
    maxWidth: 'var(--theme-breakpoints-values-sm)',
    boxSizing: 'border-box',
  },
  snackBar: {
    backgroundColor: 'var(--theme-palette-error-main)',
    border: '1px solid var(--theme-palette-error-contrastText)',
    color: 'var(--theme-palette-error-contrastText)',
    width: '100%',
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'var(--theme-palette-error-contrastText)',
  },
  message: {
    display: 'inline-block',
    color: 'var(--theme-palette-error-contrastText)',
    marginLeft: 5,
  },
  snackBarMessage: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '85%',
  },
};

const ErrorSnackBar = () => {
  const classes = useClasses(styles);

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
