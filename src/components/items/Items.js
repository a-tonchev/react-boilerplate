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
    itemsData,
    dispatchItemsData,
  } = useContext(ItemContext);

  const {
    page,
    perPage,
    sortBy,
    sortDirection,
  } = itemsData;

  useEffect(() => {
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
      dispatchItemsData({
        items,
        itemsLength,
        itemsMounted: true,
        type: newPage && newPage !== page ? 'RESET_PAGE' : '',
        page: newPage && newPage !== page ? newPage : page,
      });
      setLoading(false);
    };

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
