import React from 'react';
import { Container } from '@material-ui/core';
import Header from './header/Header';

const BasicLayout = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="md">
      {children}
    </Container>
  </>
);

export default BasicLayout;
