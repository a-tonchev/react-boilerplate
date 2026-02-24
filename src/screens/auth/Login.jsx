import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Divider,
  Typography,
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
import { loginUser } from '@/screens/users/stores/userStore';
import useClasses from '@/components/layout/hooks/useClasses';
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';

import SendVerificationMail from './SendVerificationMail';
import LoginLayout from './LoginLayout';

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  form: {
    width: '100%',
    marginTop: '2em',
  },
  submit: {
    margin: 'var(--theme-spacing-3_0_2)',
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

const Login = () => {
  const classes = useClasses(styles);
  const [redirection, setRedirection] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading();

  const [loginError, setLoginError] = useState('');
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
    convertErrorArray,
  } = useErrorCheck({
    values,
    validations,
  });

  const login = async () => {
    setCustomError(null);
    setLoginError('');
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
        if (response.errorCode === 'USER_NOT_VERIFIED') {
          setShowVerification(true);
        } else if (response.errorData?.errors?.length) {
          setCustomError(convertErrorArray(response.errorData.errors, validations));
        } else {
          setLoginError(response.errorMessage);
        }
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
    <LoginLayout>
      <div className={classes.paper}>
        <Box sx={{ mb: 5 }}>
          <img src={Logo} alt={BasicConfig.copyright.text} width={160} height="auto" />
        </Box>
        <Box sx={{ width: '100%', mb: 0.5 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: 800,
              color: 'text.primary',
              letterSpacing: '-0.025em',
            }}
          >
            {t('login')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            {t('login.welcome')}
          </Typography>
        </Box>
        <form className={classes.form} noValidate>
          {!!loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
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
          <Box sx={{
            display: 'flex', justifyContent: 'flex-end', mt: 0.5, mb: 1.5,
          }}
          >
            <CustomLink
              to={UrlEnums.PASSWORD_FORGET}
              variant="body2"
            >
              {t('password.forgot')}
            </CustomLink>
          </Box>
          <CustomButton
            fullWidth
            className={classes.submit}
            onClick={login}
          >
            {t('login')}
          </CustomButton>
          {showVerification && (
            <Box sx={{ mt: 2 }}>
              <SendVerificationMail
                email={values.email}
                fullWidth
              />
            </Box>
          )}
          <Divider sx={{ my: 3.5 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('signUp.noAccount')}
              <CustomLink
                to={UrlEnums.SIGN_UP}
                text
              >
                {t('signUp')}
              </CustomLink>
            </Typography>
          </Box>
        </form>
      </div>
    </LoginLayout>
  );
};

export default Login;
