import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from '@material-ui/core';
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
} from '@material-ui/icons';
import Authorized from '../../components/auth/Authorized';
import CustomLink from '../../components/common/customInputs/CustomLink';
import LanguagesPicker from '../../components/common/LanguagesPicker';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const menuId = 'primary-search-account-menu';

const DesktopMenu = ({
  anchorEl,
  handleMenuClose,
}) => {
  const isMenuOpen = Boolean(anchorEl);
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div>
        <Authorized authenticated>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <CustomLink plain to="/logout"><MenuItem onClick={handleMenuClose}>Logout</MenuItem></CustomLink>
        </Authorized>
        <Authorized publicOnly>
          <CustomLink plain to="/login"><MenuItem onClick={handleMenuClose}>Login</MenuItem></CustomLink>
        </Authorized>
      </div>
    </Menu>
  );
};

const DesktopMenuSection = ({ handleProfileMenuOpen }) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionDesktop}>
      <LanguagesPicker />
      <Authorized authenticated>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Authorized>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );
};

export { DesktopMenu, DesktopMenuSection };
