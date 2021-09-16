import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useMobile = () => {
  const theme = useTheme();
  const mobileBorder = theme.breakpoints.values.md;
  const windowWidth = window.innerWidth;
  const themeIsMobile = !useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = windowWidth > mobileBorder ? false : themeIsMobile;
  return {
    isMobile,
  };
};

export default useMobile;
