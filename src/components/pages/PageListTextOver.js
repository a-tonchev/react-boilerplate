import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,

  GridList, GridListTile, GridListTileBar, Icon, IconButton,
} from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PageCard from './PageCard';
import CustomLink from '../common/customInputs/CustomLink';
import StringHelper from '../../helpers/StringHelper';

const useStyles = makeStyles({
  gridList: {
    marginTop: '20px!Important',
  },
  gridLisTile: {
    height: '100%',
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

const PageListTextOver = ({ pages, ...props }) => {
  const {
    tileHeight,
    columns,
  } = getGridData(props);
  const classes = useStyles();
  return (
    <GridList cols={columns} className={classes.gridList} spacing={20}>
      {pages.map(({ title, id, image }) => (
        <CustomLink
          style={{ height: tileHeight }}
          key={id}
          plain
          to={`/page/${id}/${StringHelper.slugify(title)}`}
        >
          <GridListTile className={classes.gridLisTile}>
            <img src={`/img/demo/${image}`} alt={title} />
            <GridListTileBar
              title={title}
              subtitle={<span>by: Store</span>}
              actionIcon={(
                <IconButton
                  aria-label={`info about ${title}`}
                >
                  <Icon>info</Icon>
                </IconButton>
              )}
            />
          </GridListTile>
        </CustomLink>
      ))}
    </GridList>
  );
};

export default withWidth()(PageListTextOver);
