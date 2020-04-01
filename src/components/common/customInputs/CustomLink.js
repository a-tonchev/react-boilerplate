import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon, Link as MuiLink } from '@material-ui/core';
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
    button,
    buttonProps = {},
    icon,
    text,
    tooltip,
    children,
    plain,
    ...rest
  } = props;
  let content = (
    <>
      {icon ? <Icon>{icon}</Icon> : <span />}
      {text ? <span className={classes.text}>{text}</span> : <span />}
      {children || <span />}
    </>
  );
  if (button) content = <Button {...buttonProps} className={classes.link}>{content}</Button>;

  if (tooltip) content = <Tooltip title={tooltip}><Button className={classes.link}>{content}</Button></Tooltip>;

  if (plain) return <Link {...rest} className={classes.link}>{content}</Link>;
  return (
    <MuiLink {...rest} component={Link}>
      {content}
    </MuiLink>
  );
};

export default CustomLink;
