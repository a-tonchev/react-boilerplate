import React from 'react';
import { Container } from '@mui/material';

import Header from './header/Header';
import Footer from './footer/Footer';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  topBox: {
    height: 1,
    marginTop: 74,
    [theme.breakpoints.down('sm')]: {
      marginTop: 66,
    },
  },
});

const BasicLayout = ({ children }) => {
  const classes = useClasses(styles);
  return (
    <>
      <Header />
      <div className={classes.topBox} />
      <Container maxWidth="lg">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default BasicLayout;
