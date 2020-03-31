import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  text: {
    marginLeft: 3,
  },
}));

const CustomLink = props => {
  const classes = useStyles();
  const {
    button, icon, text, tooltip, children, ...rest
  } = props;
  let content = (
    <>
      {icon ? <Icon>{icon}</Icon> : <span />}
      {text ? <span className={classes.text}>{text}</span> : <span />}
      {children || <span />}
    </>
  );
  if (button) content = <Button className={classes.link}>{content}</Button>;

  if (tooltip) content = <Tooltip title={tooltip}><Button className={classes.link}>{content}</Button></Tooltip>;

  return <Link {...rest} className={classes.link}>{content}</Link>;
};

export default CustomLink;
