import React from 'react';
import { Container } from '@material-ui/core';
import Header from './Header';

const BasicLayout = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="md">
      {children}
    </Container>
  </>
);

export default BasicLayout;
