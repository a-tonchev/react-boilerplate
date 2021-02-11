import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import muiTheme from './theme';
import BasicLayout from './BasicLayout';

const DesignProvider = ({ width, currentTheme = 1, children }) => {
  const myTheme = muiTheme[currentTheme];
  myTheme.isMobile = !isWidthUp('md', width);
  myTheme.currentWidth = width;
  return (
    <ThemeProvider theme={myTheme}>
      <BasicLayout>
        {children}
      </BasicLayout>
    </ThemeProvider>
  );
};

export default withWidth()(DesignProvider);
