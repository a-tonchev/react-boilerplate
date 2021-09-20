import React from 'react';
import {
  IconButton,
  MenuItem,
  Menu as MuiMenu,
} from '@material-ui/core';
import {
  MoreVert as MoreIcon,
} from '@material-ui/icons';

import { useIsAdmin, useLoggedIn, useUserData } from '@/screens/users/hooks/userDataHooks';
import AuthHelper from '@/screens/auth/AuthHelper';
import useClasses from '@/components/layout/hooks/useClasses';

import { menu } from './DesktopMenu';

const styles = theme => ({
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const mobileMenuId = 'primary-search-account-menu-mobile';

const MobileMenu = ({
  mobileMoreAnchorEl,
  handleMobileMenuClose,
  ...rest
}) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userData = useUserData();
  const loggedIn = useLoggedIn();
  const isAdmin = useIsAdmin();
  return (
    <MuiMenu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {menu.map((el, ind) => {
        const {
          component: Component,
          onClick,
          text,
          authorizations,
        } = el;
        if (authorizations && !AuthHelper.isAuthorized({ ...userData, isAdmin, loggedIn }, authorizations)) {
          return null;
        }
        if (onClick) {
          return (
            <MenuItem key={`${ind}_${1}`} onClick={rest[onClick]}>
              <Component />
              {text ? <p>{text}</p> : <></>}
            </MenuItem>
          );
        }
        return (
          <MenuItem key={`${ind}_${1}`}>
            <Component />
            {text ? <p>{text}</p> : <></>}
          </MenuItem>
        );
      })}
    </MuiMenu>
  );
};

const MobileMenuSection = ({ handleMobileMenuOpen }) => {
  const classes = useClasses(styles);
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
