import React, { useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Item from './Item';

const SortableItem = props => {
  const { id, gridProps = {}, setWidth } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    rect,
    ...rest
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const { offsetWidth } = rest?.node?.current || {};

  useEffect(() => {
    offsetWidth && setWidth(id, offsetWidth);
  }, [offsetWidth, id]);

  return (
    <Item id={id} ref={setNodeRef} style={style} {...attributes} {...listeners} gridProps={gridProps} />
  );
};

export default SortableItem;
