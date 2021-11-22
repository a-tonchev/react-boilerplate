import { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomButton from '@/components/inputs/CustomButton';
import CustomTextField from '@/components/inputs/CustomTextField';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  button: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
  },
};

const InputDialog = ({
  title,
  text,
  open,
  name,
  label = '',
  type = 'text',
  onClose,
  onSave,
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="input-dialog"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="input-dialog">{title}</DialogTitle>
      <DialogContent>
        <Typography className={classes.text} variant="subtitle1">
          {text}
        </Typography>
        <CustomTextField
          autoFocus
          margin="dense"
          label={label}
          id="input-value"
          type={type}
          fullWidth
          value={value}
          onChange={({ value: newValue }) => setValue(newValue)}
        />
      </DialogContent>
      <DialogActions>
        <CustomButton
          onClick={() => onClose()}
          color="primary"
          className={classes.button}
        >
          {t('cancel')}
        </CustomButton>
        <CustomButton
          variant="outlined"
          onClick={() => {
            onClose();
            onSave({
              name,
              value,
            });
            setValue('');
          }}
          color="secondary"
          className={classes.button}
        >
          {t('save')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};
export default InputDialog;
