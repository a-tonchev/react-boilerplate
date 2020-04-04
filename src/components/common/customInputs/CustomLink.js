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
    boxSizing: 'border-box',
  },
  text: {
    marginLeft: 3,
  },
}));

const PureLink = ({ href, children, ...rest }) => <a href={href} {...rest}>{children}</a>;

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
      {icon ? <Icon>{icon}</Icon> : null}
      {text ? <span className={classes.text}>{text}</span> : null}
      {children || null}
    </>
  );
  if (button) content = <Button {...buttonProps} className={classes.link}>{content}</Button>;

  if (tooltip) content = <Tooltip title={tooltip}><Button className={classes.link}>{content}</Button></Tooltip>;

  if (plain) {
    if (rest.href) {
      return <a className={classes.link} {...rest}>{content}</a>;
    }
    return <Link className={classes.link} {...rest}>{content}</Link>;
  }
  return (
    <MuiLink {...rest} component={rest.href ? PureLink : Link}>
      {content}
    </MuiLink>
  );
};

export default CustomLink;
