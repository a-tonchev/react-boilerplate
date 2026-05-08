import { useState, useEffect } from 'react';
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
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';
import FormErrorAlert from '@/components/validations/FormErrorAlert';

import SendVerificationMail from './SendVerificationMail';
import LoginLayout from './LoginLayout';

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
  const [redirection, setRedirection] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const { loading, Loading, setLoading } = useLoading();
  const [loginError, setLoginError] = useState('');
  const [values, setValues] = useState({ email: '', password: '' });

  useEffect(() => {
    const { state } = location;
    const { redirectFrom } = state || {};
    if (redirectFrom) setRedirection(redirectFrom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    setCustomError, isError, getActivateError, convertErrorArray,
  } = useErrorCheck({ values, validations });

  const login = async () => {
    setCustomError(null);
    setLoginError('');
    const err = getActivateError();
    if (!err) {
      setLoading(true);
      const response = await Connections.postRequest(ApiEndpoints.login, {
        email: values.email,
        password: values.password,
      });
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
        loginUser({ redirectedFrom, ...response.data });
      }
    }
  };

  const onKeyDown = event => {
    if (event.key === 'Enter') login().then();
  };

  const handleChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };

  if (loading) return <Loading />;

  return (
    <LoginLayout>
      <div className="flex flex-col items-start">
        <div className="mb-10">
          <img src={Logo} alt={BasicConfig.copyright.text} width={160} height="auto" />
        </div>
        <div className="w-full mb-1">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
            {t('login')}
          </h1>
          <p className="text-base text-muted-foreground mt-1.5">
            {t('login.welcome')}
          </p>
        </div>
        <form className="w-full mt-8" noValidate>
          <FormErrorAlert error={loginError} />
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
          <div className="flex justify-end mt-4 mb-6">
            <CustomLink to={UrlEnums.PASSWORD_FORGET} className="text-sm">
              {t('password.forgot')}
            </CustomLink>
          </div>
          <CustomButton fullWidth onClick={login}>
            {t('login')}
          </CustomButton>
          {showVerification && (
            <div className="mt-4">
              <SendVerificationMail email={values.email} fullWidth />
            </div>
          )}
          <div className="h-px bg-border my-7" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('signUp.noAccount')}</p>
            <div className="mt-2">
              <CustomLink to={UrlEnums.SIGN_UP}>{t('signUp')}</CustomLink>
            </div>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};

export default Login;
