import React from 'react';
import { Container } from '@material-ui/core';

import useClasses from '@/components/layout/hooks/useClasses';

import Header from './header/Header';
import Footer from './footer/Footer';

const styles = theme => ({
  container: {
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },
});

const BasicLayout = ({ children }) => {
  const classes = useClasses(styles);
  return (
    <>
      <Header />
      <Container className={classes.container} maxWidth="lg">
        {children}
      </Container>
      <Footer />
    </>
  );
};

export default BasicLayout;
