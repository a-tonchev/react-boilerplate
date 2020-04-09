import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {

  GridList,
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PageCard from './PageCard';

const useStyles = makeStyles({
  gridList: {
    marginTop: '20px!Important',
  },
});

const getGridData = props => {
  if (isWidthUp('lg', props.width)) {
    return {
      columns: 6,
      tileHeight: 190,
    };
  }

  if (isWidthUp('md', props.width)) {
    return {
      columns: 5,
      tileHeight: 210,
    };
  }

  if (isWidthUp('sm', props.width)) {
    return {
      columns: 4,
      tileHeight: 210,
    };
  }

  return {
    columns: 2,
    tileHeight: 210,
  };
};

const PageListJs = ({ pages, ...props }) => {
  const {
    columns,
  } = getGridData(props);
  const classes = useStyles();
  return (
    <GridList cols={columns} className={classes.gridList} spacing={16}>
      {pages.map(({ title, id, image }) => (
        <PageCard
          key={id}
          plain
          style={{ height: 'auto' }}
          title={title}
          id={id}
          image={image}
        />
      ))}
    </GridList>
  );
};

export default withWidth()(PageListJs);
