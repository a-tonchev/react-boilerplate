import { useState } from 'react';
import {
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';
import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import CustomCheckBox from '@/components/inputs/CustomCheckBox';
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

const SignUp = () => {
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
      text: 'terms.required',
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
            {t('onBoarding')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 0.75 }}
          >
            {t('signUp.description')}
          </Typography>
        </Box>
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
            label={(
              <Trans
                i18nKey="legal.termsCheckbox"
                values={{ privacyPolicyLink: t('legal.privacy') }}
                components={[
                  <span />,
                  <CustomLink to={UrlEnums.PRIVACY_POLICY} />,
                ]}
              />
            )}
            name="terms"
            onChange={handleChange}
            error={isError('terms')}
          />
          <CustomButton
            fullWidth
            className={classes.submit}
            onClick={signUp}
          >
            {t('signUp')}
          </CustomButton>
          <Divider sx={{ my: 3.5 }} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('login.alreadyAccount')}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <CustomLink
                to={UrlEnums.LOGIN}
                variant="body2"
              >
                {t('login')}
              </CustomLink>
            </Box>
          </Box>
        </form>
      </div>
    </LoginLayout>
  );
};

export default SignUp;
