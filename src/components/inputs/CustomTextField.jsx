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
    fieldName,
    value,
    onChange,
    error,
    valid,
    endText,
    ...rest
  },
) => {
  const { t } = useTranslation();

  const handleChange = e => {
    const { type } = e.target;
    let { value: val } = e.target;
    if (type && type === 'number') {
      val = parseFloat(val);
    }
    onChange({
      name: name || fieldName,
      fieldName: fieldName || name,
      value: val,
    });
  };
  const classes = stylesToUse();
  return (
    <>
      <TextField
        label={t(label)}
        name={name}
        aria-label={t('textInput')}
        className={valid ? classes.success : ''}
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        error={!!error}
        margin="normal"
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
