import { useNode } from '@craftjs/core';
import {
  Slider, FormControl, FormLabel, TextField,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
// import ContentEditable from 'react-contenteditable';

export const Text = ({
  text, fontSize, textAlign, ...props
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode(state => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
      role="button"
      {...props}
      ref={ref => connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <TextField
        value={text}
        onChange={e => setProp(
          props => (props.text = e.target.value),
          500,
        )}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode(node => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <FormControl size="small" component="fieldset">
      <FormLabel component="legend">Font size</FormLabel>
      <Slider
        value={fontSize || 7}
        step={7}
        min={1}
        max={50}
        onChange={(_, value) => {
          setProp(props => (props.fontSize = value), 1000);
        }}
      />
    </FormControl>
  );
};

export const TextDefaultProps = {
  text: 'Hi',
  fontSize: 20,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
