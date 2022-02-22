import { LockOutlined } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import CustomLink from '@/components/inputs/CustomLink';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useErrorCheck from '@/components/validations/hooks/useError';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import useLoading from '@/components/loading/hooks/useLoading';
import CustomButton from '@/components/inputs/CustomButton';
import { useLoginUser } from '@/screens/users/hooks/userDataHooks';
import useClasses from '@/components/layout/hooks/useClasses';

import SendVerificationMail from './SendVerificationMail';

const styles = {
  paper: {
    marginTop: 'var(--theme-spacing-3)',
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
  signUp: {
    textAlign: 'center',
    marginTop: 20,
  },
};

const validations = {
  email: {
    type: 'isEmail',
    text: 'email.notValid',
  },
  password: [{
    type: 'isEmpty',
    text: 'errorDescription.password',
  }],
};

export default function Login() {
  const classes = useClasses(styles);
  const [redirection, setRedirection] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const { t } = useTranslation();
  const loginUser = useLoginUser();
  const location = useLocation();

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const { state } = location;
    const { redirectFrom } = state || {};
    if (redirectFrom) {
      setRedirection(redirectFrom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    setCustomError,
    isError,
    getActivateError,
  } = useErrorCheck({
    values,
    validations,
  });

  const login = async () => {
    setCustomError(null);
    const err = getActivateError();
    if (!err) {
      setLoading(true);
      const response = await Connections.postRequest(
        ApiEndpoints.login,
        {
          email: values.email,
          password: values.password,
        },
      );
      if (!response.ok) {
        if (response && response.errorCode && response.errorCode === 'USER_NOT_VERIFIED') {
          setShowVerification(true);
        }
        setCustomError({ email: response.errorMessage });
        setLoading(false);
      } else {
        let redirectedFrom = null;
        if (
          redirection
          && !redirection.includes(UrlEnums.LOGOUT)
          && !redirection.includes(UrlEnums.SIGN_UP)
        ) {
          redirectedFrom = redirection;
        }
        loginUser({
          redirectedFrom,
          ...response.data,
        });
      }
    }
  };
  const onKeyDown = event => {
    if (event.key === 'Enter') {
      login().then();
    }
  };

  const handleChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  if (loading) return <Loading />;

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('login')}
        </Typography>
        <form className={classes.form} noValidate>
          <CustomTextField
            name="email"
            label="email.address"
            id="email"
            aria-label={t('email')}
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            type="email"
            autoFocus
            fullWidth
            required
            error={isError('email')}
          />
          <CustomTextField
            name="password"
            label="password"
            id="password"
            aria-label={t('password')}
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            type="password"
            fullWidth
            required
            error={isError('password')}
          />
          <CustomButton
            fullWidth
            className={classes.submit}
            onClick={login}
          >
            {t('login')}
          </CustomButton>
          <Grid container>
            <Grid item xs={12}>
              <CustomLink to={UrlEnums.PASSWORD_FORGET} variant="body2">
                {t('password.forgot')}
              </CustomLink>
            </Grid>
            <Grid item xs={12}>
              {showVerification && (
                <SendVerificationMail
                  email={values.email}
                  fullWidth
                />
              )}
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            className={classes.signUp}
          >
            <Grid item xs={12}>
              <Typography>
                {t('signUp.noAccount')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomLink
                to={UrlEnums.SIGN_UP}
                button
                buttonProps={{
                  fullWidth: true,
                  variant: 'outlined',
                }}
              >
                {t('signUp')}
              </CustomLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
