import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import variants from './variants';
import typography from './typography';
import overrides from './overrides';

const theme = variant => createMuiTheme(
  {
    overrides: overrides,
    typography: typography,
    palette: variant.palette,
  },
  variant.name,
);

const themes = variants.map(variant => theme(variant));

export default themes;
