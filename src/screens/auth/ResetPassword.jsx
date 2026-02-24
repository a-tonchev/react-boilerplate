import { useState } from 'react';
import {
  Box,
  FormHelperText,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import CustomLink from '@/components/inputs/CustomLink';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import CustomButton from '@/components/inputs/CustomButton';
import useClasses from '@/components/layout/hooks/useClasses';
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';

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

const ResetPassword = () => {
  const classes = useClasses(styles);
  const { resetToken } = useParams();

  const { t } = useTranslation();
  const [values, setValues] = useState({
    password: '',
    repeatPassword: '',
  });

  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    password: {
      type: 'isEmpty',
      text: 'errorDescription.password',
    },
    repeatPassword: {
      customValidation: () => values.password === values.repeatPassword,
      text: 'password.shouldMatch',
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

  if (passwordResetSuccess) {
    return (
      <SuccessBox
        text={t('password.resetSuccessful')}
        button={<CustomLink to={UrlEnums.LOGIN}>{t('login')}</CustomLink>}
      />
    );
  }

  const resetPassword = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const res = await Connections.postRequest(ApiEndpoints.resetPassword, {
        password: values.password,
        resetToken,
      });
      if (res.ok) {
        setPasswordResetSuccess(true);
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
      } else {
        setCustomError({
          password: res.errorMessage,
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
          <FormHelperText sx={{ mt: 0.75, fontSize: '0.95rem' }}>
            {t('typeNewPassword')}
          </FormHelperText>
        </Box>
        <form className={classes.form} noValidate>
          <CustomTextField
            id="password"
            name="password"
            label={t('newPassword')}
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
            label={t('repeatNewPassword')}
            value={values.repeatPassword}
            onChange={handleChange}
            type="password"
            fullWidth
            required
            error={isError('repeatPassword')}
          />
          <CustomButton
            fullWidth
            className={classes.submit}
            onClick={resetPassword}
          >
            {t('setNewPassword')}
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

export default ResetPassword;
