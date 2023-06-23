import {
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton, ListItemButton,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  LockOutlined,
  Home,
  AccountCircle,
  WebAsset,
  SupervisorAccount,
  Web,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--theme-spacing-0_1)',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  sidebarLogo: {
    position: 'absolute',
    left: '20px',
  },
});

const Sidebar = () => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.drawerHeader}>
        <div className={classes.sidebarLogo}>
          {t('app.title')}
        </div>
        <IconButton size="large">
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <CustomLink plain to={UrlEnums.MAIN}>
          <ListItemButton key="home">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={t('home')} />
          </ListItemButton>
        </CustomLink>
        <Authorized publicOnly>
          <CustomLink plain to={UrlEnums.LOGIN}>
            <ListItemButton key="login">
              <ListItemIcon>
                <LockOutlined />
              </ListItemIcon>
              <ListItemText primary={t('login')} />
            </ListItemButton>
          </CustomLink>
        </Authorized>
        <Authorized authenticated>
          <CustomLink plain to={UrlEnums.PROFILE}>
            <ListItemButton key="profile">
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary={t('profile')} />
            </ListItemButton>
          </CustomLink>
          <ListItemButton key="myPages">
            <ListItemIcon>
              <WebAsset />
            </ListItemIcon>
            <ListItemText primary={t('pages.my')} />
          </ListItemButton>
        </Authorized>
        <Authorized adminOnly>
          <Divider />
          <CustomLink plain to={UrlEnums.ALL_USERS}>
            <ListItemButton key="allUsers">
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary={t('users.all')} />
            </ListItemButton>
          </CustomLink>
          <CustomLink plain to={UrlEnums.MAIN}>
            <ListItemButton key="allPages">
              <ListItemIcon>
                <Web />
              </ListItemIcon>
              <ListItemText primary={t('pages.all')} />
            </ListItemButton>
          </CustomLink>
        </Authorized>
      </List>
    </>
  );
};

export default Sidebar;
