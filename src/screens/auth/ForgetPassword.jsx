import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomTextField from '@/components/inputs/CustomTextField';
import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useError from '@/components/validations/hooks/useError';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import CustomButton from '@/components/inputs/CustomButton';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import Logo from '@/components/layout/assets/logo.svg';
import BasicConfig from '@/components/config/BasicConfig';

import LoginLayout from './LoginLayout';

const ForgetPassword = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState({ email: '' });
  const [requestLinkSent, setRequestLinkSent] = useState(false);
  const { loading, Loading, setLoading } = useLoading();
  const validations = { email: { type: 'isEmail', text: 'email.notValid' } };
  const {
    setCustomError, isError, getActivateError, convertErrorArray,
  } = useError({ values, validations });

  if (requestLinkSent) return <SuccessBox text={t('requestLinkSent')} />;

  const resetPassword = async () => {
    setCustomError(null);
    setLoading(true);
    const err = getActivateError();
    if (!err) {
      const res = await Connections.postRequest(ApiEndpoints.passwordResetRequest, { email: values.email });
      if (res.ok) {
        setRequestLinkSent(true);
      } else if (res.errorData && res.errorData.errors) {
        setCustomError(convertErrorArray(res.errorData.errors));
      } else {
        setCustomError({ email: res.errorMessage });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const handleChange = ({ name, value }) => { setValues({ ...values, [name]: value }); };
  const onKeyDown = event => { if (event.key === 'Enter') resetPassword().then(); };

  return (
    <LoginLayout>
      <div className="flex flex-col items-start">
        <div className="mb-10">
          <img src={Logo} alt={BasicConfig.copyright.text} width={160} height="auto" />
        </div>
        <div className="w-full mb-1">
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">{t('resetPassword')}</h1>
          <p className="text-base text-muted-foreground mt-1.5">{t('resetPassword.description')}</p>
        </div>
        <form className="w-full mt-8" noValidate>
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
          <CustomButton fullWidth className="mt-6" onClick={resetPassword}>{t('sendVerificationLink')}</CustomButton>
          <div className="text-center mt-4">
            <CustomLink to={UrlEnums.LOGIN}>{t('backToLogin')}</CustomLink>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};

export default ForgetPassword;
