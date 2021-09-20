import { LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import CustomCheckBox from '@/components/inputs/CustomCheckBox';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  paper: {
    marginTop: 'var(--theme-spacing-8)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 'var(--theme-spacing-1)',
    backgroundColor: 'var(--theme-palette-primary-main)',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 'var(--theme-spacing-1)',
  },
  submit: {
    margin: 'var(--theme-spacing-3_0_2)',
  },
};

export default function SignUp() {
  const classes = useClasses(styles);

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
      text: 'errorDescription.email',
    },
    password: {
      type: 'isEmpty',
      text: 'errorDescription.password',
    },
    repeatPassword: {
      customValidation: () => values.password === values.repeatPassword,
      text: 'password.shouldMatch',
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
    convertErrorArray,
  } = useError({
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
      const res = await Connections.postRequest(ApiEndpoints.signUp, {
        email: values.email,
        password: values.password,
      });

      if (res.ok) {
        setSignUpCompleted(true);
      } else if (res.errorCode === 'USER_ALREADY_EXISTS') {
        setCustomError({ email: 'user.alreadyExists' });
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
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
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('onBoarding')}
        </Typography>
        <form className={classes.form} noValidate>
          <CustomTextField
            id="email"
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
            id="password"
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
            id="repeatPassword"
            name="repeatPassword"
            label="repeatPassword"
            value={values.repeatPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('repeatPassword')}
          />
          <CustomCheckBox
            label="Terms and service"
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
            {t('signUp')}
          </Button>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            className={classes.signUp}
          >
            <Grid item xs={12}>
              <Typography>
                {t('login.alreadyAccount')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomLink
                to={UrlEnums.LOGIN}
                button
                buttonProps={{
                  fullWidth: true,
                  variant: 'outlined',
                }}
              >
                {t('login')}
              </CustomLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
