import { useState } from 'react';
import {
  Drawer as MuiDrawer,
} from '@mui/material';
import { ListIcon } from '@phosphor-icons/react';
import IconButton from '@mui/material/IconButton';

import Sidebar from './Sidebar';

const Drawer = () => {
  const [open, setOpen] = useState(false);

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
          style={{ width: 260 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Sidebar />
        </div>
      </MuiDrawer>
      <IconButton
        edge="start"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{
          color: '#A0AEC0',
          borderRadius: '10px',
          padding: '8px',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: '#FFFFFF',
          },
        }}
        size="large"
      >
        <ListIcon size={22} weight="regular" />
      </IconButton>
    </div>
  );
};

export default Drawer;
