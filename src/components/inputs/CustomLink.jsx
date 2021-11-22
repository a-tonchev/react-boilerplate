import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Link as MuiLink } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

import CustomButton from './CustomButton';

const styles = {
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    boxSizing: 'border-box',
  },
  text: {
    marginLeft: 3,
  },
};

const PureLink = forwardRef((props, ref) => {
  const { href, children, ...rest } = props;
  return <a href={href} {...rest} ref={ref}>{children}</a>;
});

const CustomLink = forwardRef((props, ref) => {
  const classes = useClasses(styles);
  const {
    button,
    buttonProps = {},
    text,
    tooltip,
    component,
    children,
    plain,
    className = '',
    ...rest
  } = props;

  const childrenContent = (children && children[0] && children[0].props?.href)
    ? children[0].props.children
    : children;

  let content = (
    <>
      {text ? <span className={classes.text}>{text}</span> : null}
      {childrenContent || null}
    </>
  );

  if (button) {
    content = (
      <CustomButton
        className={classes.link}
        {...buttonProps}
      >
        {content}
      </CustomButton>
    );
  }

  if (tooltip) content = <Button className={classes.link}>{content}</Button>;

  const { to } = rest;

  if (to && to.startsWith && to.startsWith('http')) {
    rest.href = to;
    delete rest.to;
  }

  Object.keys(rest).forEach(key => {
    if (typeof rest[key] === 'boolean') {
      delete rest[key];
    }
  });

  if (typeof to !== 'string' && !rest.href) {
    rest.to = '/';
  }

  if (plain) {
    if (buttonProps.disabled) {
      return content;
    }
    if (rest.href) {
      return <a className={`${className} ${classes.link}`} ref={ref} {...rest}>{content}</a>;
    }
    return <Link className={`${className} ${classes.link}`} ref={ref} {...rest}>{content}</Link>;
  }

  if (buttonProps.disabled) {
    return (
      <MuiLink className={className} {...rest} ref={ref} component="div">
        {content}
      </MuiLink>
    );
  }

  return (
    <MuiLink className={className} {...rest} ref={ref} component={rest.href ? PureLink : Link}>
      {content}
    </MuiLink>
  );
});

export default CustomLink;
