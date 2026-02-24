import { Button } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  green: {
    backgroundColor: '#2dad67',
    color: '#FFF',
    '&:hover': {
      backgroundColor: '#249457',
    },
    '&:active': {
      backgroundColor: '#249457',
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
