import React from 'react';
import { Box, Paper } from '@mui/material';

import Grid from '@/components/inputs/CustomGrid';
import BasicConfig from '@/components/config/BasicConfig';
import LanguagesPicker from '@/components/translations/LanguagesPicker';
import Footer from '@/components/layout/footer/Footer';
import useClasses from '@/components/layout/hooks/useClasses';
import LegalButtonGroup from '@/components/inputs/LeagalButtonGroup';

const styles = {
  root: {
    height: '100vh',
    backgroundColor: 'var(--theme-palette-background-default, #F7FAFC)',
  },
  image: {
    backgroundImage: BasicConfig.loginImage,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(26,32,44,0.15) 0%, rgba(45,55,72,0.3) 100%)',
    },
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
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
          borderLeft: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 2,
            py: 1,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <LanguagesPicker />
        </Box>
        <Grid
          item
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: {
              xs: 3,
              sm: 6,
            },
          }}
        >
          <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
            {children}
          </div>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          alignContent="center"
          justifyContent="center"
          sx={{ pb: 2.5, pt: 1 }}
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
