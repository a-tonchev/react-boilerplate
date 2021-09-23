import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
