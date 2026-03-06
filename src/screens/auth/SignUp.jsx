import { useState } from 'react';
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
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';

import LoginLayout from './LoginLayout';

const SignUp = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: '', password: '', repeatPassword: '', firstName: '', lastName: '', terms: false,
  });

  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    email: { type: 'isEmail', text: 'errorDescription.email' },
    password: { type: 'isEmpty', text: 'errorDescription.password' },
    repeatPassword: { customValidation: () => values.password === values.repeatPassword, text: 'password.shouldMatch' },
    terms: { type: 'isTrue', text: 'terms.required' },
  };

  const {
    setCustomError, isError, getActivateError, convertErrorArray,
  } = useError({ values, validations });

  if (signUpCompleted) return <SuccessBox text="signUp.successfulRegistration" />;

  const signUp = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const res = await Connections.postRequest(ApiEndpoints.signUp, {
        email: values.email, password: values.password,
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
      <div className="flex flex-col items-start">
        <div className="mb-10">
          <img src={Logo} alt={BasicConfig.copyright.text} width={160} height="auto" />
        </div>
        <div className="w-full mb-1">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">{t('onBoarding')}</h1>
          <p className="text-base text-muted-foreground mt-1.5">{t('signUp.description')}</p>
        </div>
        <form className="w-full mt-8" noValidate>
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
          <div className="mt-4">
            <CustomCheckBox
              label={(
                <Trans
                  i18nKey="legal.termsCheckbox"
                  values={{ privacyPolicyLink: t('legal.privacy') }}
                  components={[<span />, <CustomLink to={UrlEnums.PRIVACY_POLICY} className="text-sm" />]}
                />
              )}
              name="terms"
              onChange={handleChange}
              error={isError('terms')}
            />
          </div>
          <CustomButton fullWidth className="mt-6" onClick={signUp}>{t('signUp')}</CustomButton>
          <div className="h-px bg-border my-7" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('login.alreadyAccount')}</p>
            <div className="mt-2">
              <CustomLink to={UrlEnums.LOGIN}>{t('login')}</CustomLink>
            </div>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};

export default SignUp;
