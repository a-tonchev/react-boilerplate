import React from 'react';
import {
  Checkbox, FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const CustomCheckBox = (
  {
    label,
    name,
    value,
    onChange,
    error,
    valid,
    endText,
    fullWidth,
    ...rest
  },
) => {
  const { t } = useTranslation();

  const handleChangeCheckBox = e => {
    const { checked } = e.target;
    onChange({ name, value: checked });
  };

  const labelToShow = typeof label === 'string' ? t(label) : label;

  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            value={value}
            checked={value}
            onChange={handleChangeCheckBox}
            name={name}
            color="primary"
            {...rest}
          />
        )}
        label={labelToShow}
        style={{ width: fullWidth ? '100%' : 'auto', marginRight: 0 }}
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

export default CustomCheckBox;
