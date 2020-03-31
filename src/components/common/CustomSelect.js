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
    minWidth: 120,
  },
}));


const CustomSelect = ({
  label, value, onChange, error, options = [], ...rest
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <FormControl fullWidth className={classes.formControl} error={!!error}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map(option => <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>)}
      </Select>
      {!!error && <FormHelperText>{t(error)}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;
