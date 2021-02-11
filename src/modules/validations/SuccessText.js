import { FormHelperText } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  successText: {
    color: theme.palette.success.main,
  },
}));

const SuccessText = ({ text, center, ...rest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (text ? (
    <FormHelperText
      style={{
        textAlign: center ? 'center' : 'left',
      }}
      className={classes.successText}
      {...rest}
    >
      {t(text)}
    </FormHelperText>
  ) : <div />);
};

export default SuccessText;
