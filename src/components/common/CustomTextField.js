import React from 'react';
import {
  FormHelperText, InputAdornment, makeStyles, TextField,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const stylesToUse = makeStyles(() => ({
  success: {
    '& input:valid + fieldset': {
      borderColor: 'green',
    },
  },
}));

const CustomTextField = (
  {
    label,
    name,
    value,
    onChange,
    error,
    valid,
    endText,
    ...rest
  },
) => {
  const { t } = useTranslation();
  const classes = stylesToUse();
  return (
    <>
      <TextField
        label={label}
        name={name}
        className={valid ? classes.success : ''}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        error={!!error}
        InputProps={{
          endAdornment: !!endText && <InputAdornment position="end">{endText}</InputAdornment>,
        }}
        {...rest}
      />
      {!!error && (
      <FormHelperText
        error={!!error}
      >
        {t(error)}
      </FormHelperText>
      )}
    </>
  );
};

export default CustomTextField;
