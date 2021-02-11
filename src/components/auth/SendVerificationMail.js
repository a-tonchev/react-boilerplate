import React from 'react';

import { useTranslation } from 'react-i18next';
import Connections, { ApiEndpoints } from '../../modules/connections/Connections';
import useLoading from '../../modules/loading/hooks/useLoading';
import CustomButton from '../../modules/inputs/CustomButton';

import useAlert from '../../modules/dialogs/hooks/useAlert';

const SendVerificationMail = ({
  email,
  ...rest
}) => {
  const { t } = useTranslation();

  const {
    loading,
    setLoading,
  } = useLoading();

  const {
    AlertDialog,
    openDialog,
  } = useAlert();

  const sendVerificationEmail = async () => {
    setLoading(true);
    const res = await Connections.postRequest(ApiEndpoints.sendUserVerificationEmail, {
      email,
    });
    if (res.ok) {
      openDialog(t('emailSent'));
    } else if (res.errorMessage) {
      openDialog(res.errorMessage);
    } else {
      openDialog(t('sendingEmailError'));
    }
    setLoading(false);
  };

  return (
    <>
      {AlertDialog}
      <CustomButton
        onClick={sendVerificationEmail}
        disabled={loading}
        {...rest}
      >
        {loading ? t('sendingEmail') : t('sendAgainVerificationEmail')}
      </CustomButton>
    </>
  );
};

export default SendVerificationMail;
