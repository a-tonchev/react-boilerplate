import React from 'react';
import { LinearProgress, CircularProgress } from '@material-ui/core';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Loading = ({ type, ...rest }) => {
  const classes = useClasses(styles);

  return (
    <span className={classes.root}>
      {type === 'circular'
        ? <CircularProgress {...rest} />
        : <LinearProgress {...rest} />}
    </span>
  );
};

Loading.defaultProps = {
  size: 'default',
};

export default Loading;
