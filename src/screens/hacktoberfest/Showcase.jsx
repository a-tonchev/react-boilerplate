import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const Showcase = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography>{t('Components')}</Typography>
      {/* display here all your components */}
    </div>
  );
};

export default Showcase;
