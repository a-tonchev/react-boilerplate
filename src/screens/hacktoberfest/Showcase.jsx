import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import Header from './Header';

const Showcase = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography>{t('Components')}</Typography>
      {/* display here all your components */}
      <Header
        imageUrl="https://bit.ly/3BtHOWh"
        title="Training Title"
        buttonLink="/"
        buttonText="Open Category"
        items={[
          {
            price: '$42.50',
            title: 'Product 1',
            description: 'Domyos',
            imageUrl: 'https://bit.ly/3ld41SA',
          },
          {
            price: '$14.90',
            title: 'Product 1',
            description: 'Domyos',
            imageUrl: 'https://bit.ly/3ld41SA',
          },
          {
            price: '$12.40',
            title: 'Product 1',
            description: 'Domyos',
            imageUrl: 'https://bit.ly/3ld41SA',
          },
          {
            price: '$19.40',
            title: 'Product 1',
            description: 'Domyos',
            imageUrl: 'https://bit.ly/3ld41SA',
          },
        ]}
      />
    </div>
  );
};

export default Showcase;
