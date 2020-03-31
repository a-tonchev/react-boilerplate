import React from 'react';
import {
  Checkbox, FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
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
    ...rest
  },
) => {
  const { t } = useTranslation();
  return (
    <>
      <FormControlLabel
        control={(
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            name={name}
            color="primary"
            {...rest}
          />
        )}
        label={label}
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
