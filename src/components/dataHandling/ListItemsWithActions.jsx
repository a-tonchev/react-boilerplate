import {
  IconButton, List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import {
  Delete, Edit, KeyboardArrowDown, KeyboardArrowUp,
} from '@mui/icons-material';
import React from 'react';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  item: {
    maxWidth: '60%',
  },
};

const ListItemsWithActions = ({
  items, handleSwitch, handleRemove, handleEdit,
}) => {
  const classes = useClasses(styles);

  return (
    <>
      <List>
        {items.map((item, index) => (
          <ListItem key={item.key || `item_${index}`}>
            <ListItemText
              className={item.className || classes.item}
              primary={item.text}
              secondary={item.secondary}
            />
            <ListItemSecondaryAction>
              {handleSwitch && (
              <>
                <IconButton
                  edge="end"
                  aria-label="arrow_up"
                  onClick={
                  () => handleSwitch(
                    index, index - 1,
                  )
                }
                  disabled={index === 0}
                  size="large"
                >
                  <KeyboardArrowUp />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="arrow_down"
                  disabled={index === item.length - 1}
                  onClick={
                  () => handleSwitch(
                    index,
                    index + 1,
                  )
                }
                  size="large"
                >
                  <KeyboardArrowDown />
                </IconButton>
              </>
              )}
              {handleRemove && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemove(index, item)}
                size="large"
              >
                <Delete />
              </IconButton>
              )}
              {handleEdit && (
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(index, item)}
                size="large"
              >
                <Edit />
              </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ListItemsWithActions;
