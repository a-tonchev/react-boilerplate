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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import Authorized from '../../components/auth/Authorized';
import CustomLink from '../../components/common/customInputs/CustomLink';
import UrlEnums from '../../enums/UrlEnums';

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
  return (
    <>
      <div className={classes.drawerHeader}>
        <div className={classes.sidebarLogo}>
          My React App
        </div>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Authorized publicOnly>
        <CustomLink plain to={UrlEnums.LOGIN}>
          <ListItem button key="login">
            <ListItemIcon>
              <Icon>account_circle</Icon>
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </CustomLink>
      </Authorized>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
