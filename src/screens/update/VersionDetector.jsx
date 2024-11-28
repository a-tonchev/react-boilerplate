import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useConfirm from '@/components/dialogs/hooks/useConfirm';
import SWHelper from '@/components/helpers/SWHelper';

const VersionDetector = () => {
  const { t } = useTranslation();
  const {
    ConfirmDialog,
    openDialog,
  } = useConfirm('snackbar');

  useEffect(() => {
    const openNewVersionDialog = () => {
      openDialog(
        t('newVersionDetected.refresh'),
        () => {
          SWHelper.forceRefreshSW().then();
        },
      ).then();
    };

    const swMessageHandler = ({ data }) => {
      if (data?.msg === 'OPEN_DIALOG') {
        openNewVersionDialog();
      }
      if (data?.msg === 'CACHE_PREPARED') {
        SWHelper.skipWaiting().then(() => {
          SWHelper.reloadClients().then();
        });
      }
    };

    navigator.serviceWorker?.addEventListener('message', swMessageHandler);
    window.addEventListener(
      'newVersion',
      openNewVersionDialog,
    );

    if (SWHelper.isNewAvailable()) {
      openNewVersionDialog();
    }

    return () => {
      navigator.serviceWorker?.removeEventListener('message', swMessageHandler);
      navigator.serviceWorker?.removeEventListener('newVersion', openNewVersionDialog);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ConfirmDialog;
};

export default VersionDetector;
