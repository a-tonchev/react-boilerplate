import React from 'react';
import {
  FormControlLabel,
  FormHelperText,
  Radio,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const CustomRadio = (
  {
    label,
    name,
    onChange,
    error,
    valid,
    endText,
    checked,
    ...rest
  },
) => {
  const { t } = useTranslation();

  const handleChangeRadio = e => {
    const { value } = e.target;
    onChange({ name, value });
  };

  return (
    <>
      <FormControlLabel
        control={(
          <Radio
            checked={checked}
            onChange={handleChangeRadio}
            name={name}
            inputProps={{
              'aria-label': label,
            }}
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

export default CustomRadio;
