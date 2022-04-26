import { Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

import BasicConfig from '@/components/config/BasicConfig';
import useClasses from '@/components/layout/hooks/useClasses';

import Header from './header/Header';
import Footer from './footer/Footer';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    backgroundColor: theme.palette.body.background,
    minHeight: '100vh',
  },
  container: {
    display: 'grid',
    gridTemplateRows: '1fr',
  },
  gridContainer: {
    marginTop: 84,
    [theme.breakpoints.down('xs')]: {
      marginTop: 56,
    },
  },
});

const BasicLayout = ({ children }) => {
  const location = useLocation();
  const classes = useClasses(styles);

  function checkRegExp(arr) {
    return arr.some(regexp => regexp.test(location.pathname));
  }

  const noLayout = checkRegExp(
    [/^\/login/, /^\/signUp/, /^\/passwordRecovery/, /^\/logout/],
  );
  const fullSizeContent = checkRegExp([/^\/previewSpeedPage/]);

  return noLayout ? (children)
    : (
      <div className={classes.wrapper}>
        <Header />
        <Grid
          container
          direction="row"
          className={classes.gridContainer}
        >
          <Container
            maxWidth={fullSizeContent ? null : 'lg'}
            className={classes.container}
          >
            {children}
            <Footer
              href={BasicConfig.copyright.url}
              className={{ fontSize: 'smaller' }}
            >
              {BasicConfig.copyright.text}
            </Footer>
          </Container>
        </Grid>
      </div>
    );
};

export default BasicLayout;
