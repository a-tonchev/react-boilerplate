import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  MenuItem,
  Menu as MuiMenu,
} from '@material-ui/core';
import {
  MoreVert as MoreIcon,
} from '@material-ui/icons';

import { menu } from './DesktopMenu';
import Authorized from '../../components/auth/Authorized';

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
  ...rest
}) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  return (
    <MuiMenu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {menu.map((el, ind) => {
        const {
          component: Component, onClick, text, authorizations,
        } = el;
        let WrappedComponent = onClick
          ? (
            <MenuItem key={`${ind}_${1}`} onClick={rest[onClick]}>
              <Component />
              {text ? <p>{text}</p> : <></>}
            </MenuItem>
          )
          : (
            <MenuItem key={`${ind}_${1}`}>
              <Component />
              {text ? <p>{text}</p> : <></>}
            </MenuItem>
          );
        if (authorizations) {
          WrappedComponent = (
            <Authorized key={`${ind}_${0}`} {...authorizations}>
              {WrappedComponent}
            </Authorized>
          );
        }
        return WrappedComponent;
      })}
    </MuiMenu>
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
