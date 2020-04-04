import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Icon,
  Divider,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Connections from '../../helpers/Connections';
import CustomLink from '../common/customInputs/CustomLink';
import StringHelper from '../../helpers/StringHelper';
import useLoading from '../common/customHooks/loadingHook';
import PageCard from './PageCard';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  image: {
    maxWidth: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: '100%',
    paddingTop: '100%',
    position: 'relative',
  },
  gridLisTile: {
    height: '100%',
  },
  gridList: {
    marginTop: '20px!Important',
  },
  divider: {
    width: '100%',
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

const AllPages = props => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [pages, setPages] = useState([]);
  const { loading, Loading, setLoading } = useLoading(true);

  useEffect(() => {
    const getPages = async () => {
      const allPages = await Connections.getFakePages();
      if (allPages && allPages.length) setPages(allPages);
      setLoading(false);
    };
    getPages().then();
  }, []);

  const {
    columns, tileHeight,
  } = getGridData(props);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={1} className={classes.root}>
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
      <Divider className={classes.divider} />
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
                    className={classes.icon}
                  >
                    <Icon>info</Icon>
                  </IconButton>
              )}
              />
            </GridListTile>
          </CustomLink>
        ))}
      </GridList>
    </Grid>
  );
};

export default withWidth()(AllPages);
