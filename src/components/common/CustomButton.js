import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { green as mGreen } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  green: {
    backgroundColor: mGreen[700],
    color: 'white',
    '&:hover': {
      backgroundColor: mGreen[600],
    },
    '&:active': {
      backgroundColor: mGreen[600],
    },
  },
}));

const CustomButton = ({
  children,
  text,
  buttonTheme,
  ...rest
}) => {
  const buttonProps = { ...rest };
  if (buttonTheme === 'primary') buttonProps.color = 'primary';

  const classes = useStyles();
  if (buttonTheme === 'green') buttonProps.className = classes.green;
  return <Button variant="contained" {...buttonProps}>{children}</Button>;
};

export default CustomButton;
