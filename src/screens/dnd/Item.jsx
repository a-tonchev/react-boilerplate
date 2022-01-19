import { forwardRef } from 'react';
import { Grid } from '@mui/material';

const Item = forwardRef(({
  id, style, isOverlay, dndWidth, ...props
}, ref) => {
  const ariaPressed = props['aria-pressed'];
  const { gridProps, ...restOfProps } = props;

  const styleToUse = {
    height: 50,
    backgroundColor: 'red',
    textAlign: 'center',
    border: '1px solid green',
    display: 'inline-block',
    opacity: ariaPressed ? 0.5 : 1,
    width: isOverlay || gridProps.container ? '100%' : 'auto',
    ...style,
  };

  if (gridProps.container) return <Grid container {...restOfProps} {...gridProps} style={styleToUse} ref={ref} />;

  return <Grid item {...restOfProps} {...gridProps} style={styleToUse} ref={ref}>{id}</Grid>;
});

export default Item;
