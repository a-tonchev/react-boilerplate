import { Box, Container, Typography } from '@mui/material';
import { css } from '@emotion/react';

import CustomLink from '@/components/inputs/CustomLink';

const Copyright = ({ href, children, className }) => (
  <Typography
    variant="caption"
    display="block"
    gutterBottom
    color="textSecondary"
    align="center"
    css={css`${className}`}
  >
    {'Copyright © '}
    <CustomLink
      rel="noreferrer noopener"
      plain
      target="_blank"
      href={href}
    >     {new Date().getFullYear()}{' '}
      {children}
    </CustomLink>
  </Typography>
);

const Footer = ({ href, children, className = '' }) => (
  <Container>
    <Box mt={1} align="center">
      <Copyright className={className} href={href}>
        {children}
      </Copyright>
    </Box>
  </Container>
);
export default Footer;
