import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import CustomLink from '@/components/inputs/CustomLink';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

const HeaderLogo = () => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  return (
    <CustomLink plain to="/">
      <Typography className={classes.title} variant="h6" noWrap>
        {t('app.title')}
      </Typography>
    </CustomLink>
  );
};

export default HeaderLogo;
