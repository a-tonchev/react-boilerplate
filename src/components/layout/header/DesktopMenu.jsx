import {
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  UserCircleIcon,
  EnvelopeSimpleIcon,
  BellIcon,
  UserIcon,
  GearIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
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
      alignItems: 'center',
      gap: '4px',
    },
  },
});

const menuId = 'primary-search-account-menu';

const iconButtonSx = {
  color: '#A0AEC0',
  borderRadius: '10px',
  padding: '8px',
  transition: 'all 0.15s ease',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#FFFFFF',
  },
};

const menu = [
  {
    component: () => <LanguagesPicker />,
  },
  {
    authorizations: { authenticated: true },
    component: () => (
      <IconButton aria-label="show 4 new mails" sx={iconButtonSx} size="large">
        <Badge badgeContent={4} color="secondary">
          <EnvelopeSimpleIcon size={22} weight="regular" />
        </Badge>
      </IconButton>
    ),
    text: i18n.t('messages'),
  },
  {
    authorizations: { authenticated: true },
    component:
      () => (
        <IconButton aria-label="show 17 new notifications" sx={iconButtonSx} size="large">
          <Badge badgeContent={17} color="secondary">
            <BellIcon size={22} weight="regular" />
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
          onClick={onClick}
          sx={iconButtonSx}
          size="large"
        >
          <UserCircleIcon size={24} weight="regular" />
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
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div>
        <Authorized authenticated>
          <CustomLink plain to="/profile">
            <MenuItem onClick={handleMenuClose}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <UserIcon size={18} weight="regular" color="#718096" />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('profile')}</Typography>
              </Box>
            </MenuItem>
          </CustomLink>
          <MenuItem onClick={handleMenuClose}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <GearIcon size={18} weight="regular" color="#718096" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('Settings')}</Typography>
            </Box>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <CustomLink plain to="/logout">
            <MenuItem onClick={handleMenuClose}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SignOutIcon size={18} weight="regular" color="#718096" />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('logout')}</Typography>
              </Box>
            </MenuItem>
          </CustomLink>
        </Authorized>
        <Authorized publicOnly>
          <CustomLink plain to="/login">
            <MenuItem onClick={handleMenuClose}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SignOutIcon size={18} weight="regular" color="#718096" />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{t('login')}</Typography>
              </Box>
            </MenuItem>
          </CustomLink>
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
        const { [onClick]: onClickFunction } = props;
        let WrappedComponent = onClick
          ? <Component key={`${ind}_${1}`} onClick={onClickFunction} />
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
