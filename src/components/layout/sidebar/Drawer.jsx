import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer as MuiDrawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import Sidebar from './Sidebar';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function Drawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = openDrawer => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(openDrawer);
  };

  return (
    <div>
      <MuiDrawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Sidebar />
        </div>
      </MuiDrawer>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}
