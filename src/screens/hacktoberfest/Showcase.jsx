import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import DropdownMenu from './DropdownMenu';
import Header from './Header';

const Showcase = () => {
  const { t } = useTranslation();
  const [simplePopperEl, setSimplePopperEl] = useState(null);
  const [complexPopperEl, setComplexPopperEl] = useState(null);

  const [componentfirstC1, setcomponentfirstC1] = useState(null);
  const [componentsecondC2, setcomponentsecondC2] = useState(null);
  const [componentthirdC3, setcomponentthirdC3] = useState(null);

  return (
    <div>
      <Typography>{t('Components')}</Typography>
      {/* display here all your components */}

      <div>
        <span
          onMouseEnter={e => setcomponentfirstC1(e.currentTarget)}
          onMouseLeave={() => setcomponentfirstC1(null)}
        >
          <button type="button">Marke wahlen</button>
          <DropdownMenu
            variant="componentfirst"
            open={Boolean(componentfirstC1)}
            anchorEl={componentfirstC1}
            categories={[

              {
                name: 'Filter name 1',
                children: [
                  {
                    name: 'subfilter 1',
                    link: 'subfilter1',
                  },
                  {
                    name: 'subfilter 2',
                    link: 'subfilter2',
                  }],
              },
              {
                name: 'Filter name 2',
                children: [
                  {
                    name: 'option 1',
                    link: 'option1',
                  },
                  {
                    name: 'option 2',
                    link: 'option2',
                  }],
              },

            ]}
          />

        </span>
        <span
          onMouseEnter={e => setcomponentsecondC2(e.currentTarget)}
          onMouseLeave={() => setcomponentsecondC2(null)}
        >
          <button type="button">Modell wahlen</button>
          <DropdownMenu
            variant="componentsecond"
            open={Boolean(componentsecondC2)}
            anchorEl={componentsecondC2}
            categories={[

              {
                name: 'Filter name 1',
                children: [
                  {
                    name: 'subfilter 1',
                    link: 'subfilter1',
                  },
                  {
                    name: 'subfilter 2',
                    link: 'subfilter2',
                  }],
              },
              {
                name: 'Filter name 2',
                children: [
                  {
                    name: 'option 1',
                    link: 'option1',
                  },
                  {
                    name: 'option 2',
                    link: 'option2',
                  },
                ],
              },

            ]}
          />

        </span>
        <span
          onMouseEnter={e => setcomponentthirdC3(e.currentTarget)}
          onMouseLeave={() => setcomponentthirdC3(null)}
        >
          <button type="button">Motor (Typ) wahlen</button>
          <DropdownMenu
            variant="componentthird"
            open={Boolean(componentthirdC3)}
            anchorEl={componentthirdC3}
            categories={[

              {
                name: 'Filter name 1',
                children: [
                  {
                    name: 'subfilter 1',
                    link: 'subfilter1',
                  },
                  {
                    name: 'subfilter 2',
                    link: 'subfilter2',
                  }],
              },
              {
                name: 'Filter name 2',
                children: [
                  {
                    name: 'option 1',
                    link: 'option1',
                  },
                  {
                    name: 'option 2',
                    link: 'option2',
                  },
                ],
              },

            ]}
          />

        </span>
        <span>
          <form action="action_page.php">
            <button type="submit">Search</button>
          </form>
        </span>
      </div>

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
