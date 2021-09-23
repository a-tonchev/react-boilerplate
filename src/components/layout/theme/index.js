import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles';

import variants from './variants';
import typography from './typography';
import components from './components';

const theme = variant => createMuiTheme({
  components,
  typography,
  palette: variant.palette,
});

const themes = variants.map(variant => theme(variant));

export default themes;
