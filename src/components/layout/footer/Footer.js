import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';
import CustomLink from '../../inputs/CustomLink';

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <CustomLink
      rel="noreferrer"
      plain
      target="_blank"
      href="https://github.com/a-tonchev/react-boilerplate"
    >
      Your Website
    </CustomLink>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const Footer = () => (
  <Container>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>
);
export default Footer;
