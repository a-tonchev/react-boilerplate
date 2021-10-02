import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import { FormHelperText } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  formControl: {
    minWidth: 50,
    verticalAlign: 'middle',
    marginTop: 5,
  },
  nativeInput: {
    boxSizing: 'border-box',
  },
};

const CustomSelect = ({
  label,
  value,
  onChange,
  error,
  name,
  formControlProps = {},
  fullWidth = true,
  options = [],
  ...rest
}) => {
  const classes = useClasses(styles);
  const { t } = useTranslation();

  const handleChange = e => {
    const { value: val } = e.target;
    onChange({ name, value: val });
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      className={classes.formControl}
      error={!!error}
      {...formControlProps}
    >
      {label && <InputLabel>{t(label)}</InputLabel>}
      <Select
        value={value}
        onChange={handleChange}
        classes={{
          nativeInput: classes.nativeInput,
        }}
        label={label ? t(label) : label}
        {...rest}
      >
        {
          options.map(
            ({
              key, value: optionValue, text, icon: Icon, ...optionProps
            }) => (
              <MenuItem key={key || optionValue} value={optionValue} {...optionProps}>
                {Icon && <><Icon style={{ marginRight: 10 }} /></>}{t(text)}
              </MenuItem>
            ),
          )
        }
      </Select>
      {!!error && <FormHelperText>{t(error)}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
