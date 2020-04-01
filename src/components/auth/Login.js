import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Icon,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomLink from '../common/customInputs/CustomLink';
import CustomTextField from '../common/customInputs/CustomTextField';
import Connections from '../../helpers/Connections';
import { UserContext } from '../../contexts/UserContext';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <CustomLink color="inherit" href="https://material-ui.com/">
      Your Website
    </CustomLink>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    terms: false,
  });
  const [error, setError] = useState(null);
  const { loginUser } = useContext(UserContext);

  const login = async () => {
    setError(null);
    const user = await Connections.getFakeLogin(values.email);
    if (!user) {
      setError({ email: 'User not found' });
    } else {
      loginUser(user);
    }
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      login().then();
    }
  };

  const handleChange = event => {
    const { name } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock_outlined</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <CustomTextField
            name="email"
            label="Email Address"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            autoFocus
            fullWidth
            required
            error={error && error.email ? error.email : null}
          />
          <CustomTextField
            name="password"
            label="Password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            type="password"
            autoFocus
            fullWidth
            required
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Agree with terms"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <CustomLink to="/forgot" variant="body2">
                Forgot password?
              </CustomLink>
            </Grid>
            <Grid item>
              <CustomLink to="/signup" variant="body2">
                Don't have an account? Sign Up
              </CustomLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
