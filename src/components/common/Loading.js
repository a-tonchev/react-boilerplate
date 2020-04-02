import React from 'react';
import { makeStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
};

Loading.defaultProps = {
  size: 'default',
};

export default Loading;
