import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Connections, { ApiEndpoints } from '../../modules/connections/Connections';
import useLoading from '../../modules/loading/hooks/useLoading';
import SuccessBox from '../../modules/validations/SuccessBox';
import ErrorBox from '../../modules/validations/ErrorBox';
import CustomLink from '../../modules/inputs/CustomLink';
import UrlEnums from '../../modules/connections/enums/UrlEnums';

export default function Verify({
  match,
}) {
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
}
