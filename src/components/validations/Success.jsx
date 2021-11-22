import {
  Grid,
  Zoom,
  Alert,
} from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
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
};

const Success = ({ children }) => {
  const classes = useClasses(styles);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Zoom in timeout={500}>
        <Alert
          className={classes.alert}
          severity="success"
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

export default Success;
