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
  MoreVert as MoreIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const mobileMenuId = 'primary-search-account-menu-mobile';

const MobileMenu = ({
  mobileMoreAnchorEl,
  handleMobileMenuClose,
  handleProfileMenuOpen,
}) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
};

const MobileMenuSection = ({ handleMobileMenuOpen }) => {
  const classes = useStyles();
  return (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </div>
  );
};

export { MobileMenu, MobileMenuSection };
