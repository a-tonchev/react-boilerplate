import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 50,
    verticalAlign: 'middle',
    marginTop: 5,
  },
  nativeInput: {
    boxSizing: 'border-box',
  },
}));

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
  const classes = useStyles();
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
