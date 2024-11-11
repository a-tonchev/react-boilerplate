import React from 'react';
import { Paper } from '@mui/material';
import { Language } from '@mui/icons-material';

import Grid from '@/components/inputs/CustomGrid';
import BasicConfig from '@/components/config/BasicConfig';
import LanguagesPicker from '@/components/translations/LanguagesPicker';
import Footer from '@/components/layout/footer/Footer';
import useClasses from '@/components/layout/hooks/useClasses';
import LegalButtonGroup from '@/components/inputs/LeagalButtonGroup';

const styles = {
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: BasicConfig.loginImage,
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};

export default function LoginLayout({ children }) {
  const classes = useClasses(styles);
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} lg={8} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={4}
        component={Paper}
        elevation={6}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="row"
            style={{ backgroundColor: '#efefef' }}
          >
            <Language />
            <LanguagesPicker color="dark" />
          </Grid>
          <Grid
            item
            sx={{
              padding: {
                xs: 2,
                sm: 4,
              },
            }}
          >
            {children}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          alignContent="center"
          justifyContent="center"
        >
          <LegalButtonGroup />
          <Footer
            href={BasicConfig.copyright.url}
            className={{ fontSize: 'smaller' }}
          >{BasicConfig.copyright.text}
          </Footer>
        </Grid>
      </Grid>
    </Grid>
  );
}
