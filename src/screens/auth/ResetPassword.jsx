import { useState } from 'react';
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
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';

import LoginLayout from './LoginLayout';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const { t } = useTranslation();
  const [values, setValues] = useState({ password: '', repeatPassword: '' });
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = {
    password: { type: 'isEmpty', text: 'errorDescription.password' },
    repeatPassword: {
      customValidation: () => values.password === values.repeatPassword,
      text: 'password.shouldMatch',
    },
  };
  const {
    setCustomError, isError, getActivateError, convertErrorArray,
  } = useError({ values, validations });

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
      const res = await Connections.postRequest(ApiEndpoints.resetPassword, { password: values.password, resetToken });
      if (res.ok) {
        setPasswordResetSuccess(true);
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
      } else {
        setCustomError({ password: res.errorMessage });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const handleChange = ({ name, value }) => { setValues({ ...values, [name]: value }); };

  return (
    <LoginLayout>
      <div className="flex flex-col items-start">
        <div className="mb-10">
          <img src={Logo} alt={BasicConfig.copyright.text} width={160} height="auto" />
        </div>
        <div className="w-full mb-1">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">{t('resetPassword')}</h1>
          <p className="text-sm text-muted-foreground mt-1.5">{t('typeNewPassword')}</p>
        </div>
        <form className="w-full mt-8" noValidate>
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
          <CustomButton fullWidth className="mt-6" onClick={resetPassword}>{t('setNewPassword')}</CustomButton>
          <div className="text-center mt-4">
            <CustomLink to={UrlEnums.LOGIN}>{t('backToLogin')}</CustomLink>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};

export default ResetPassword;
