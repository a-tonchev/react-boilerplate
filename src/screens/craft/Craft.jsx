import {
  Editor, Frame, Element, useNode,
} from '@craftjs/core';
import {
  Typography, Paper, Grid,
} from '@mui/material';
import React from 'react';

import useClasses from '@/components/layout/hooks/useClasses';

import SettingsPanel from './SettingsPanel';
import Toolbox from './Toolbox';
// import { Topbar } from './Topbar.jsx';
import Button from './user/Button.jsx';
import { Card, CardBottom, CardTop } from './user/Card.jsx';
import { Container } from './user/Container.jsx';
import { Text } from './user/Text.jsx';

const styles = {
  root: {
    padding: 0,
    background: 'rgb(252, 253, 253)',
  },
};

const GridContainer = ({
  children, ...props
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Grid
      container
      spacing={1}
      {...props}
      ref={ref => connect(drag(ref))}
    >
      {children}
    </Grid>
  );
};

const someStyles = {
  gridItem: {
    '&:hover': { backgroundColor: 'red' },
  },
};

const GridItem = ({
  children, ...props
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const classes = useClasses(someStyles);

  return (
    <Grid
      item
      {...props}
      ref={ref => connect(drag(ref))}
      className={classes.gridItem}
    >
      {children}
    </Grid>
  );
};

const Craft = () => {
  const classes = useClasses(styles);

  return (
    <div style={{ margin: '0 auto', width: '800px' }}>
      <Typography style={{ margin: '20px 0' }} variant="h5" align="center">
        Basic Page Editor
      </Typography>
      <Editor
        resolver={{
          Card,
          Button,
          Text,
          Container,
          CardTop,
          CardBottom,
          GridContainer,
          GridItem,
        }}
      >
        <Grid container spacing={1} style={{ paddingTop: '10px' }}>
          <Grid item xs>
            <Frame>
              <Element
                canvas
                is={Container}
                background="#eeeeee"
                data-cy="root-container"
              >
                <Element
                  canvas
                  is={GridContainer}
                  background="#eeeeee"
                  data-cy="root-container"
                >
                  <Element
                    canvas
                    is={GridItem}
                    xs={4}
                    data-cy="root-container"
                  >
                    <Button text="Click me" size="small" data-cy="frame-button" />
                    <Button text="Click me" size="small" data-cy="frame-button" />
                  </Element>
                  <Element
                    canvas
                    is={GridItem}
                    xs={4}
                    data-cy="root-container"
                  >
                    <Button text="Click me" size="small" data-cy="frame-button" />
                  </Element>
                  <Element
                    canvas
                    is={GridItem}
                    xs={4}
                    data-cy="root-container"
                  >
                    <Button text="One" size="small" data-cy="frame-button" />
                    <Button text="Two" size="small" data-cy="frame-button" />
                    <Button text="Three" size="small" data-cy="frame-button" />
                  </Element>
                </Element>
                <Card data-cy="frame-card" />
                <Button text="Click me" size="small" data-cy="frame-button" />
                <Text fontSize={20} text="Hi world!" data-cy="frame-text" />
                <Element
                  canvas
                  is={Container}
                  padding={6}
                  background="#999999"
                  data-cy="frame-container"
                >
                  <Text
                    size="small"
                    text="It's me again!"
                    data-cy="frame-container-text"
                  />
                </Element>
              </Element>
            </Frame>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.root}>
              <Toolbox />
              <SettingsPanel />
            </Paper>
          </Grid>
        </Grid>
      </Editor>
    </div>
  );
};

export default Craft;
