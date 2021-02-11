import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Typography,
  Icon,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CustomLink from '../common/customInputs/CustomLink';
import CustomTextField from '../common/customInputs/CustomTextField';
import Connections from '../../modules/connections/Connections';
import CustomCheckBox from '../common/customInputs/CustomCheckBox';
import useErrorCheck from '../common/customHooks/errorHook';
import useLoading from '../common/customHooks/loadingHook';
import SuccessBox from '../common/SuccessBox';

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

export default function SignUp() {
  const classes = useStyles();

  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    firstName: '',
    lastName: '',
    terms: false,
  });

  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    email: {
      type: 'isEmail',
      text: 'email.notValid',
    },
    password: {
      type: 'isEmpty',
      text: 'field.required',
    },
    repeatPassword: {
      customValidation: () => values.password !== values.repeatPassword,
      text: 'password.shouldMatch',
    },
    firstName: {
      type: 'isName',
      text: 'name.invalid',
    },
    lastName: {
      type: 'isName',
      text: 'name.invalid',
    },
    terms: {
      type: 'isTrue',
      text: 'field.required',
    },
  };

  const {
    setCustomError,
    isError,
    getActivateError,
  } = useErrorCheck({
    values,
    validations,
  });

  if (signUpCompleted) {
    return (
      <SuccessBox
        text="signUp.successfulRegistration"
      />
    );
  }

  const signUp = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const user = await Connections.getFakeLogin(values.email);
      if (!user) {
        setSignUpCompleted(true);
      } else {
        setCustomError({ email: 'user.alreadyExists' });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const handleChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon>lock_outlined</Icon>
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login')}
        </Typography>
        <form className={classes.form} noValidate>
          <CustomTextField
            name="email"
            label="email.address"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            type="email"
            autoFocus
            fullWidth
            required
            error={isError('email')}
          />
          <CustomTextField
            name="password"
            label="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('password')}
          />
          <CustomTextField
            name="repeatPassword"
            label="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('repeatPassword')}
          />
          <CustomTextField
            name="firstName"
            label="firstName"
            value={values.firstName}
            onChange={handleChange}
            fullWidth
            required
            error={isError('firstName')}
          />
          <CustomTextField
            name="lastName"
            label="lastName"
            value={values.lastName}
            onChange={handleChange}
            fullWidth
            required
            error={isError('lastName')}
          />
          <CustomCheckBox
            label="terms.agree"
            name="terms"
            onChange={handleChange}
            error={isError('terms')}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUp}
          >
            {t('login')}
          </Button>
          <Grid container>
            <Grid item xs>
              <CustomLink to="/login" variant="body2">
                {t('login.alreadyAccount')}
              </CustomLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
