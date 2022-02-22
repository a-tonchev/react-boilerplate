import { LockOutlined } from '@mui/icons-material';
import { useState } from 'react';
import {
  Avatar,
  FormHelperText,
  Typography,
  Container,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import CustomButton from '@/components/inputs/CustomButton';
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

const ResetPassword = ({
  match,
}) => {
  const classes = useClasses(styles);

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
      const { resetToken } = match.params;
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
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('resetPassword')}
        </Typography>
        <form className={classes.form} noValidate>
          <FormHelperText>
            {t('typeNewPassword')}:
          </FormHelperText>
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
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
