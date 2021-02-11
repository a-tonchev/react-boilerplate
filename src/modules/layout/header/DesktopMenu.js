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
import Authorized from '../../../components/auth/Authorized';
import CustomLink from '../../../components/common/customInputs/CustomLink';
import LanguagesPicker from '../../../components/common/LanguagesPicker';
import i18n from '../../translations/i18n';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const menuId = 'primary-search-account-menu';

const menu = [
  {
    component: () => <LanguagesPicker />,
  },
  {
    authorizations: { authenticated: true },
    component: () => (
      <IconButton aria-label="show 4 new mails" color="inherit">
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
        <IconButton aria-label="show 17 new notifications" color="inherit">
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

const DesktopMenuSection = (props) => {
  const classes = useStyles();
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
