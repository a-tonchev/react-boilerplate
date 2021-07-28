import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from './header/Header';
import Footer from './footer/Footer';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 64,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },
}));

const BasicLayout = ({ children }) => {
  const classes = useStyles();
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
