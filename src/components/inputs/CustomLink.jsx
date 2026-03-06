import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

import CustomButton from './CustomButton';

const CustomLink = forwardRef((props, ref) => {
  const {
    button,
    buttonProps = {},
    text,
    tooltip,
    component,
    children,
    plain,
    className = '',
    variant,
    ...rest
  } = props;

  const childrenContent = (children && children[0] && children[0].props?.href)
    ? children[0].props.children
    : children;

  let content = (
    <>
      {text ? <span className="ml-0.5">{text}</span> : null}
      {childrenContent || null}
    </>
  );

  if (button) {
    content = (
      <CustomButton
        className="no-underline"
        {...buttonProps}
      >
        {content}
      </CustomButton>
    );
  }

  if (tooltip) {
    content = (
      <button type="button" className="no-underline">
        {content}
      </button>
    );
  }

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

  const linkClass = cn(
    'no-underline hover:no-underline text-secondary font-medium hover:text-secondary/80 transition-colors',
    className,
  );

  if (plain || buttonProps.disabled) {
    if (buttonProps.disabled) {
      return <span className={linkClass} ref={ref}>{content}</span>;
    }
    if (rest.href) {
      return <a className={linkClass} ref={ref} {...rest}>{content}</a>;
    }
    return <Link className={linkClass} ref={ref} {...rest}>{content}</Link>;
  }

  if (rest.href) {
    return <a className={linkClass} ref={ref} {...rest}>{content}</a>;
  }

  return <Link className={linkClass} ref={ref} {...rest}>{content}</Link>;
});

CustomLink.displayName = 'CustomLink';

export default CustomLink;
