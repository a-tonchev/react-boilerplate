import { useMemo } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@mui/styles';
import {
  StyledEngineProvider,
  alpha,
  useTheme,
} from '@mui/material';
import { ThemeProvider, Global, css } from '@emotion/react';

import SuccessSnackBar from '@/components/dialogs/snackbars/SuccessSnackBar';
import ErrorSnackBar from '@/components/dialogs/snackbars/ErrorSnackBar';

import muiTheme from './theme';
import BasicLayout from './BasicLayout';

const GlobalStyles = () => {
  const theme = useTheme();

  const styles = useMemo(() => css({
    ':root': {
      '--theme-palette-success-main': theme.palette.success.main,
      '--theme-palette-primary-main': theme.palette.primary.main,
      '--theme-palette-secondary-main': theme.palette.secondary.main,
      '--theme-breakpoints-values-sm': `${theme.breakpoints.values.sm}px`,
      '--theme-palette-success-contrastText': theme.palette.success.contrastText,
      '--theme-palette-error-main': theme.palette.error.main,
      '--theme-palette-error-contrastText': theme.palette.error.contrastText,
      '--theme-palette-primary-contrastText': theme.palette.primary.contrastText,
      '--theme-spacing-8': theme.spacing(8),
      '--searchInput-paddingLeft': `calc(1em + ${theme.spacing(4)})`,
      '--theme-spacing-3': theme.spacing(3),
      '--theme-spacing-2': theme.spacing(2),
      '--theme-spacing-1': theme.spacing(1),
      '--theme-spacing-0_1': theme.spacing(0, 1),
      '--theme-spacing-0_2': theme.spacing(0, 2),
      '--theme-spacing-3_0_2': theme.spacing(3, 0, 2),
      '--theme-spacing-1_1_1_0': theme.spacing(1, 1, 1, 0),
      '--theme-shape-borderRadius': `${theme.shape.borderRadius}px`,
      '--alpha-theme-palette-common-white-0-8': alpha(theme.palette.common.white, 0.8),
      '--alpha-theme-palette-common-white-1': alpha(theme.palette.common.white, 1),
      '--theme-transitions-create-width': theme.transitions.create('width'),
    },
  }), [theme]);

  return <Global styles={styles} />;
};

const myTheme = muiTheme[1];

const DesignProvider = ({ children }) => (
  <StylesProvider injectFirst>
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={myTheme}>
        <ThemeProvider theme={myTheme}>
          <GlobalStyles />
          <BasicLayout>
            {children}
          </BasicLayout>
          <SuccessSnackBar />
          <ErrorSnackBar />
        </ThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  </StylesProvider>
);

export default DesignProvider;
