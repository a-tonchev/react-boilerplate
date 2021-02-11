import React from 'react';
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Authorized from '../../../components/auth/Authorized';
import CustomLink from '../../../components/common/customInputs/CustomLink';
import UrlEnums from '../../connections/UrlEnums';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  sidebarLogo: {
    position: 'absolute',
    left: '20px',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.drawerHeader}>
        <div className={classes.sidebarLogo}>
          {t('app.title')}
        </div>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <CustomLink plain to={UrlEnums.MAIN}>
          <ListItem button key="home">
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary={t('home')} />
          </ListItem>
        </CustomLink>
        <Authorized publicOnly>
          <CustomLink plain to={UrlEnums.LOGIN}>
            <ListItem button key="login">
              <ListItemIcon>
                <Icon>lock_outlined</Icon>
              </ListItemIcon>
              <ListItemText primary={t('login')} />
            </ListItem>
          </CustomLink>
        </Authorized>
        <Authorized authenticated>
          <CustomLink plain to={UrlEnums.PROFILE}>
            <ListItem button key="profile">
              <ListItemIcon>
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary={t('profile')} />
            </ListItem>
          </CustomLink>
          <ListItem button key="myPages">
            <ListItemIcon>
              <Icon>web_asset</Icon>
            </ListItemIcon>
            <ListItemText primary={t('pages.my')} />
          </ListItem>
        </Authorized>
        <Authorized adminOnly>
          <Divider />
          <CustomLink plain to={UrlEnums.ALL_USERS}>
            <ListItem button key="allUsers">
              <ListItemIcon>
                <Icon>supervisor_account</Icon>
              </ListItemIcon>
              <ListItemText primary={t('users.all')} />
            </ListItem>
          </CustomLink>
          <CustomLink plain to={UrlEnums.MAIN}>
            <ListItem button key="allPages">
              <ListItemIcon>
                <Icon>web</Icon>
              </ListItemIcon>
              <ListItemText primary={t('pages.all')} />
            </ListItem>
          </CustomLink>
        </Authorized>
      </List>
    </>
  );
};

export default Sidebar;
