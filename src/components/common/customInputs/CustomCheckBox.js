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

  const handleChangeCheckBox = e => {
    const { checked } = e.target;
    onChange({ name, value: checked });
  };

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
        label={t(label)}
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
