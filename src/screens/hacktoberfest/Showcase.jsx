import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import DropdownMenu from './DropdownMenu';
import Header from './Header';

const Showcase = () => {
  const { t } = useTranslation();
  const [simplePopperEl, setSimplePopperEl] = useState(null);
  const [complexPopperEl, setComplexPopperEl] = useState(null);

  return (
    <div>
      <Typography>{t('Components')}</Typography>
      {/* display here all your components */}
      <span
        onMouseEnter={e => setSimplePopperEl(e.currentTarget)}
        onMouseLeave={() => setSimplePopperEl(null)}
      >
        <button type="button">TEST SIMPLE DROPDOWN</button>
        <DropdownMenu
          anchorEl={() => simplePopperEl}
          open={Boolean(simplePopperEl)}
          categories={[
            { name: 'Category 1', link: '/' },
            { name: 'Category 2', link: '/' },
            { name: 'Category 3', link: '/' },
            { name: 'Category 4', link: '/' },
            { name: 'Category 5', link: '/' },
          ]}
        />
      </span>
      <span
        onMouseEnter={e => setComplexPopperEl(e.currentTarget)}
        onMouseLeave={() => setComplexPopperEl(null)}
      >
        <button type="button">TEST COMPLEX DROPDOWN</button>
        <DropdownMenu
          variant="complex"
          open={Boolean(complexPopperEl)}
          anchorEl={complexPopperEl}
          categories={[
            {
              name: 'Aliquam Metus Vitae',
              children: [
                {
                  name: 'Quisque orci augue',
                  link: '/some-link',
                },
                {
                  name: 'Laoreet amet ante',
                  link: '/some-link',
                },
                {
                  name: 'Aenean quam vitae',
                  link: '/some-link',
                },
                {
                  name: 'Aliquam ac semper',
                  link: '/some-link',
                },
                {
                  name: 'Nulla liqula puvinar',
                  link: '/some-link',
                },
              ],
            },
            {
              name: 'Lobortis Sem Mauris',
              children: [
                {
                  name: 'Aenean quam vitae',
                  link: '/some-link',
                },
                {
                  name: 'Nulla ligula pulvinar',
                  link: '/some-link',
                },
                {
                  name: 'Quisque orci augue',
                  link: '/some-link',
                },
                {
                  name: 'Aliquam ac lobortis',
                  link: '/some-link',
                },
                {
                  name: 'Laoreet sem sodales',
                  link: '/some-link',
                },
              ],
            },
            {
              name: 'Aliquam Metus Vitae',
              children: [
                {
                  name: 'Quisque orci augue',
                  link: '/some-link',
                },
                {
                  name: 'Laoreet amet ante',
                  link: '/some-link',
                },
                {
                  name: 'Aenean quam vitae',
                  link: '/some-link',
                },
                {
                  name: 'Aliquam ac semper',
                  link: '/some-link',
                },
                {
                  name: 'Nulla liqula puvinar',
                  link: '/some-link',
                },
              ],
            },
            {
              name: 'Lobortis Sem Mauris',
              children: [
                {
                  name: 'Aenean quam vitae',
                  link: '/some-link',
                },
                {
                  name: 'Nulla ligula pulvinar',
                  link: '/some-link',
                },
                {
                  name: 'Quisque orci augue',
                  link: '/some-link',
                },
                {
                  name: 'Aliquam ac lobortis',
                  link: '/some-link',
                },
                {
                  name: 'Laoreet sem sodales',
                  link: '/some-link',
                },
              ],
            },
            {
              name: 'Aliquam Metus Vitae',
              children: [
                {
                  name: 'Quisque orci augue',
                  link: '/some-link',
                },
                {
                  name: 'Laoreet amet ante',
                  link: '/some-link',
                },
                {
                  name: 'Aenean quam vitae',
                  link: '/some-link',
                },
                {
                  name: 'Aliquam ac semper',
                  link: '/some-link',
                },
                {
                  name: 'Nulla liqula puvinar',
                  link: '/some-link',
                },
              ],
            },
            {
              name: 'Lobortis Sem Mauris',
              children: [
                {
                  name: 'Aenean quam vitae',
                  link: '/some-link',
                },
                {
                  name: 'Nulla ligula pulvinar',
                  link: '/some-link',
                },
                {
                  name: 'Quisque orci augue',
                  link: '/some-link',
                },
                {
                  name: 'Aliquam ac lobortis',
                  link: '/some-link',
                },
                {
                  name: 'Laoreet sem sodales',
                  link: '/some-link',
                },
              ],
            },
          ]}
        />
      </span>
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
