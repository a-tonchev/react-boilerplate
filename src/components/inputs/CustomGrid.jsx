import PropTypes from 'prop-types';
import Grid2 from '@mui/material/Grid2';
import { forwardRef } from 'react';

const CustomGrid = forwardRef(({
  item,
  xs,
  sm,
  md,
  lg,
  xl,
  ...otherProps
}, ref) => {
  const breakpointProps = {
    xs, sm, md, lg, xl,
  };
  const hasBreakpoints = Object.values(breakpointProps).some(value => value !== undefined);
  const sizeProp = hasBreakpoints ? { size: breakpointProps } : {};

  return (
    <Grid2
      ref={ref}
      {...sizeProp}
      {...otherProps}
    />
  );
});

CustomGrid.propTypes = {
  container: PropTypes.bool,
  item: PropTypes.bool,
  zeroMinWidth: PropTypes.bool,
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  direction: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  xs: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  sm: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  md: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  lg: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  xl: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

CustomGrid.displayName = 'CustomGrid';

export default CustomGrid;
