import React from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DefaultMenu = ({ categories }) => (
  <List>
    {categories.map(({ name, link }, i) => (
      <ListItem dense key={i}>
        <a href={link}>
          <ListItemText>{name}</ListItemText>
        </a>
      </ListItem>
    ))}
  </List>
);

const ComplexMenu = ({ categories }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
    {categories.map(({ name, children }, ind) => (
      <List dense sx={{ maxWidth: '200px' }} key={ind}>
        <ListItem>
          <Typography variant="h3" component="h2">
            {name}
          </Typography>
        </ListItem>
        {children.map(({ name: n, link }, i) => (
          <ListItem key={i}>
            <a href={link}>
              <ListItemText>{n}</ListItemText>
            </a>
          </ListItem>
        ))}
      </List>
    ))}
  </Box>
);

const DropdownMenu = ({
  open, categories, anchorEl, variant = 'default',
}) => (
  <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
    <Paper>
      {variant === 'default' ? (
        <DefaultMenu categories={categories} />
      ) : (
        <ComplexMenu categories={categories} />
      )}
    </Paper>
  </Popper>
);

export default DropdownMenu;
