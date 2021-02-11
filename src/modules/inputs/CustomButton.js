import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { green as mGreen } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  green: {
    backgroundColor: mGreen[700],
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: mGreen[600],
    },
    '&:active': {
      backgroundColor: mGreen[600],
    },
  },
  fullMobile: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const CustomButton = ({
  children,
  text,
  buttonTheme,
  fullMobile,
  color = 'primary',
  ...rest
}) => {
  const buttonProps = { ...rest, color };
  let { className: buttonClassName = '' } = buttonProps;

  if (buttonTheme === 'primary') buttonProps.color = 'primary';
  const classes = useStyles();
  if (buttonTheme === 'green') buttonClassName += ` ${classes.green}`;
  if (fullMobile) buttonClassName += ` ${classes.fullMobile}`;

  return (
    <Button
      aria-label={text || 'button'}
      variant="contained"
      {...buttonProps}
      className={buttonClassName}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
