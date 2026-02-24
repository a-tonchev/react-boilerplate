import { useState } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import CustomButton from '@/components/inputs/CustomButton';
import useClasses from '@/components/layout/hooks/useClasses';
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';

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

const ForgetPassword = () => {
  const classes = useClasses(styles);

  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: '',
  });

  const [requestLinkSent, setRequestLinkSent] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    email: {
      type: 'isEmail',
      text: 'email.notValid',
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

  if (requestLinkSent) {
    return (
      <SuccessBox
        text={t('requestLinkSent')}
      />
    );
  }

  const resetPassword = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const res = await Connections.postRequest(ApiEndpoints.passwordResetRequest, {
        email: values.email,
      });
      if (res.ok) {
        setRequestLinkSent(true);
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
      } else {
        setCustomError({
          email: res.errorMessage,
        });
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

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      resetPassword().then();
    }
  };

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
            {t('resetPassword')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            {t('resetPassword.description')}
          </Typography>
        </Box>
        <form className={classes.form} noValidate>
          <CustomTextField
            name="email"
            id="email"
            label="email.address"
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
          <CustomButton
            fullWidth
            className={classes.submit}
            onClick={resetPassword}
          >
            {t('sendVerificationLink')}
          </CustomButton>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <CustomLink to={UrlEnums.LOGIN} variant="body2">
              {t('backToLogin')}
            </CustomLink>
          </Box>
        </form>
      </div>
    </LoginLayout>
  );
};

export default ForgetPassword;
