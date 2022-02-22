import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import ErrorBox from '@/components/validations/ErrorBox';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const Verify = ({
  match,
}) => {
  const [verified, setVerified] = useState(false);
  const { verificationToken } = match.params;

  const { t } = useTranslation();

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading(true);

  useEffect(() => {
    const sendVerificationToken = async () => {
      const res = await Connections.postRequest(ApiEndpoints.verifyAccount, {
        verificationToken,
      });

      if (res.ok) {
        setVerified(true);
      }
      setLoading(false);
    };
    sendVerificationToken().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationToken]);

  if (loading) return <Loading />;

  if (verified) {
    return (
      <SuccessBox
        text="signUp.successfulVerification"
        button={<CustomLink to={UrlEnums.LOGIN}>{t('login')}</CustomLink>}
      />
    );
  }

  return (
    <ErrorBox
      text="signUp.verificationError"
    />
  );
};

export default Verify;
