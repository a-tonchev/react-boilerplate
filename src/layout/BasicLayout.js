import React from 'react';
import { Container } from '@material-ui/core';
import Header from './header/Header';
import Footer from './footer/Footer';

const BasicLayout = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="md">
      {children}
    </Container>
    <Footer />
  </>
);

export default BasicLayout;
