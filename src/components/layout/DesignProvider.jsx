import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SuccessSnackBar from '@/components/snackbars/SuccessSnackBar';
import ErrorSnackBar from '@/components/snackbars/ErrorSnackBar';
import useWidth from '@/components/theme/hooks/useWidth';

import muiTheme from './theme';
import BasicLayout from './BasicLayout';

const DesignProvider = ({ currentTheme = 1, children }) => {
  const myTheme = muiTheme[currentTheme];
  myTheme.isMobile = !useMediaQuery(myTheme.breakpoints.up('md'));
  myTheme.currentWidth = useWidth(myTheme);
  return (
    <ThemeProvider theme={myTheme}>
      <BasicLayout>
        {children}
      </BasicLayout>
      <SuccessSnackBar />
      <ErrorSnackBar />
    </ThemeProvider>
  );
};

export default withWidth()(DesignProvider);
