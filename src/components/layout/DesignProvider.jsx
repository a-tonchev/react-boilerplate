import React from 'react';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';

import SuccessSnackBar from '@/components/dialogs/snackbars/SuccessSnackBar';
import ErrorSnackBar from '@/components/dialogs/snackbars/ErrorSnackBar';

import muiTheme from './theme';
import BasicLayout from './BasicLayout';

const myTheme = muiTheme[1];

const DesignProvider = ({ children }) => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={myTheme}>
      <ThemeProvider theme={myTheme}>
        <BasicLayout>
          {children}
        </BasicLayout>
        <SuccessSnackBar />
        <ErrorSnackBar />
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default DesignProvider;
