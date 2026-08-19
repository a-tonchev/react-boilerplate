import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Connections, { ApiEndpoints } from '@/components/connections/Connections';
import useLoading from '@/components/loading/hooks/useLoading';
import SuccessBox from '@/components/validations/SuccessBox';
import ErrorBox from '@/components/validations/ErrorBox';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const Verify = () => {
  const [verified, setVerified] = useState(false);
  const { verificationToken } = useParams();

  const { t } = useTranslation();

  const {
    loading,
    Loading,
    setLoading,
  } = useLoading(true);

  const didVerify = useRef(false);

  useEffect(() => {
    // Single-use verification token: ref guard prevents StrictMode's double
    // mount from submitting it twice; the mounted flag avoids setState after
    // the user navigates away mid-request.
    if (didVerify.current) return undefined;
    didVerify.current = true;

    let mounted = true;
    const sendVerificationToken = async () => {
      const res = await Connections.postRequest(ApiEndpoints.verifyAccount, {
        verificationToken,
      });

      if (!mounted) return;
      if (res.ok) {
        setVerified(true);
      }
      setLoading(false);
    };
    sendVerificationToken().then();

    return () => {
      mounted = false;
    };
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
