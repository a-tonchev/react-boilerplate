import React from 'react';
import {
  Grid,
  Zoom,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  alert: {
    fontSize: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
    flexDirection: 'column',
  },
  alertIcon: {
    fontSize: '100px',
  },
}));

const Error = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Zoom in timeout={500}>
        <Alert
          className={classes.alert}
          severity="error"
          classes={{
            icon: classes.alertIcon,
          }}
        >
          {children}
        </Alert>
      </Zoom>
    </Grid>
  );
};

export default Error;
