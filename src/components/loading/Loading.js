import React from 'react';
import { makeStyles, LinearProgress, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Loading = ({ type, ...rest }) => {
  const classes = useStyles();

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
