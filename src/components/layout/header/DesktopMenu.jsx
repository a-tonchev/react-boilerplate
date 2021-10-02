import React from 'react';
import {
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from '@mui/material';
import {
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import LanguagesPicker from '@/components/translations/LanguagesPicker';
import i18n from '@/components/translations/i18n';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

const menuId = 'primary-search-account-menu';

const menu = [
  {
    component: () => <LanguagesPicker />,
  },
  {
    authorizations: { authenticated: true },
    component: () => (
      <IconButton aria-label="show 4 new mails" color="inherit" size="large">
        <Badge badgeContent={4} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
    ),
    text: i18n.t('messages'),
  },
  {
    authorizations: { authenticated: true },
    component:
      () => (
        <IconButton aria-label="show 17 new notifications" color="inherit" size="large">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      ),
    text: i18n.t('notifications'),
  },
  {
    component:
      ({ onClick }) => (
        <IconButton
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
          onClick={onClick}
          size="large"
        >
          <AccountCircle />
        </IconButton>
      ),
    onClick: 'handleProfileMenuOpen',
    text: i18n.t('profile'),
  },
];

const ProfileMenu = ({
  anchorEl,
  handleMenuClose,
}) => {
  const isMenuOpen = Boolean(anchorEl);
  const { t } = useTranslation();
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
          <MenuItem onClick={handleMenuClose}>{t('profile')}</MenuItem>
          <MenuItem onClick={handleMenuClose}>{t('account.my')}</MenuItem>
          <CustomLink plain to="/logout"><MenuItem onClick={handleMenuClose}>{t('logout')}</MenuItem></CustomLink>
        </Authorized>
        <Authorized publicOnly>
          <CustomLink plain to="/login"><MenuItem onClick={handleMenuClose}>{t('login')}</MenuItem></CustomLink>
        </Authorized>
      </div>
    </Menu>
  );
};

const DesktopMenuSection = props => {
  const classes = useClasses(styles);
  return (
    <div className={classes.sectionDesktop}>
      {menu.map((el, ind) => {
        const { component: Component, onClick, authorizations } = el;
        let WrappedComponent = onClick
          ? <Component key={`${ind}_${1}`} onClick={props[onClick]} />
          : <Component key={`${ind}_${1}`} />;
        if (authorizations) {
          WrappedComponent = (
            <Authorized key={`${ind}_${0}`} {...authorizations}>
              {WrappedComponent}
            </Authorized>
          );
        }
        return WrappedComponent;
      })}
    </div>
  );
};

export { ProfileMenu, DesktopMenuSection, menu };
