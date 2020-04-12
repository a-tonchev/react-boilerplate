import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import Connections from '../../helpers/Connections';
import useLoading from '../common/customHooks/loadingHook';
import ItemsList from './ItemsList';
import { ItemContext } from '../../contexts/ItemContext';
import PageListFilters from './ItemsListFilters';
import CustomPagination from '../common/customInputs/CustomPagination';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  divider: {
    width: '100%',
  },
});

const Items = () => {
  const classes = useStyles();
  const { loading, setLoading } = useLoading(true);

  const {
    filtersData,
    setItemsData,
  } = useContext(ItemContext);

  const {
    pageData,
    resetPage,
  } = filtersData;

  const {
    page,
    perPage,
    sortBy,
    sortDirection,
  } = pageData;

  const getNewItems = async () => {
    setLoading(true);
    const newItemsData = await Connections.getFakePagesData({
      perPage,
      page,
      sortBy,
      sortDirection,
    });
    const {
      items,
      itemsLength,
      newPage,
    } = newItemsData;
    setItemsData({
      itemsLength,
      items,
      itemsMounted: true,
    });
    if (newPage !== page) resetPage(newPage);
    setLoading(false);
  };

  useEffect(() => {
    getNewItems().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, sortBy, sortDirection]);

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid container className={`${classes.gridList}`} spacing={0}>
        <PageListFilters
          key="pageListFilters"
        />
        <ItemsList
          loading={loading}
        />
      </Grid>
      <CustomPagination
        key="customPagination"
      />
    </Grid>
  );
};

export default Items;
