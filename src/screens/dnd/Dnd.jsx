import React, { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Grid, Typography } from '@mui/material';

import SortableItem from './SortableItem';
import Item from './Item';

const dndWidth = {};

const Dnd = () => {
  const [activeElement, setActiveId] = useState(null);
  const [items, setItems] = useState([
    { id: '1', gridProps: { xs: 2 } },
    { id: '2', gridProps: { xs: 2 } },
    { id: '3', gridProps: { xs: 4 } },
    { id: '4', gridProps: { xs: 2 } },
    { id: '5', gridProps: { xs: 2 } },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = event => {
    const { active } = event;

    const activeEl = items.find(i => i.id === active.id);
    setActiveId(activeEl);
  };

  const handleDragEnd = event => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems(previousItems => {
        const oldIndex = previousItems.findIndex(el => el.id === active.id);
        const newIndex = previousItems.findIndex(el => el.id === over.id);

        return arrayMove(previousItems, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const setWidth = (id, width) => {
    dndWidth[id] = width;
  };

  return (
    <div style={{ width: 500 }}>
      <Typography>Test</Typography>
      <Grid container>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items}
            strategy={horizontalListSortingStrategy}
          >
            {items.map(data => (
              <SortableItem
                key={data.id}
                id={data.id}
                gridProps={data.gridProps}
                setWidth={setWidth}
              />
            ))}
          </SortableContext>
          <DragOverlay dropAnimation={{
            duration: 500,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
          >
            {activeElement ? (
              <Item
                id={activeElement.id}
                isOverlay
                style={{ width: `${dndWidth[activeElement.id]}px` }}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </Grid>
    </div>
  );
};

export default Dnd;
