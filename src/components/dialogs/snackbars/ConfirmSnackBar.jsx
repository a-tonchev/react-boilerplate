import {
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@mui/material';
import {
  Info,
  Check,
  Close,
} from '@mui/icons-material';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  root: {
    bottom: 64,
    opacity: 0.95,
    width: 'calc(100% - 16px)',
    maxWidth: 'var(--theme-breakpoints-values-sm)',
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
};

const ConfirmSnackBar = ({
  open,
  text,
  onConfirm,
  onClose,
}) => {
  const classes = useClasses(styles);

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
        size="large"
      >
        <Check />
      </IconButton>
      <IconButton className={classes.closeButton} onClick={onClose} size="large">
        <Close />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      onClose={closeSnackBar}
      className={classes.root}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
