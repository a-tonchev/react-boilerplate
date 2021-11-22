import { Button } from '@mui/material';
import { green as mGreen } from '@mui/material/colors';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  green: {
    backgroundColor: mGreen[700],
    color: 'var(--theme.palette.primary.contrastText)',
    '&:hover': {
      backgroundColor: mGreen[600],
    },
    '&:active': {
      backgroundColor: mGreen[600],
    },
  },
  fullMobile: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
});

const CustomButton = ({
  children,
  text,
  buttonTheme,
  fullMobile,
  color = 'primary',
  ...rest
}) => {
  const buttonProps = { ...rest, color };
  let { className: buttonClassName = '' } = buttonProps;

  if (buttonTheme === 'primary') buttonProps.color = 'primary';
  const classes = useClasses(styles);
  if (buttonTheme === 'green') buttonClassName += ` ${classes.green}`;
  if (fullMobile) buttonClassName += ` ${classes.fullMobile}`;

  return (
    <Button
      aria-label={text || 'button'}
      variant="contained"
      {...buttonProps}
      className={buttonClassName}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
