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
import UrlHelper from '../../helpers/UrlHelper';
import { perPageValues, sortingTypes } from '../../config/ItemConfig';
import LocalStorage from '../../helpers/LocalStorage';
import Loading from '../common/loading/Loading';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  divider: {
    width: '100%',
  },
});

const ItemsBase = () => {
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
    let isMounted = true;
    const getNewItems = async () => {
      setLoading(true);
      const newItemsData = await Connections.getFakeItemsData({
        perPage,
        page,
        sortBy,
        sortDirection,
      });
      if (isMounted) {
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
      }
    };

    getNewItems().then();
    return () => {
      isMounted = false;
    };
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

const Items = () => {
  const {
    itemsData,
    dispatchItemsData,
  } = useContext(ItemContext);

  const {
    page,
    sortBy,
    sortDirection,
    mounted,
    view,
  } = itemsData;

  useEffect(() => {
    const queryPage = UrlHelper.getIntParam('page', 1);
    let queryPerPage = UrlHelper.getIntParam('perPage', perPageValues[0]);
    let querySortBy = UrlHelper.getParam('sortBy');
    const sortingType = sortingTypes.find(st => st.name === querySortBy);
    let querySortDirection = UrlHelper.getParam('sortDirection');
    const storedView = LocalStorage.get('view');
    if (!perPageValues.includes(queryPerPage)) {
      [queryPerPage] = perPageValues;
    }

    if (sortingType) {
      querySortDirection = !sortingType.directions.includes(querySortDirection)
        ? sortingType.directions[0]
        : querySortDirection;
    } else {
      querySortBy = '';
      querySortDirection = '';
    }
    const newItemData = {
      perPage: queryPerPage,
      page: (queryPage !== page) ? queryPage : page,
      sortBy: (
        querySortBy &&
        querySortBy !== sortBy
      ) ? querySortBy : sortBy,
      sortDirection: (
        querySortDirection &&
        querySortDirection !== sortDirection
      ) ? querySortDirection : sortDirection,
      view: storedView || view,
      mounted: true,
    };

    dispatchItemsData(newItemData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return <Loading />;

  return <ItemsBase />;
};

export default Items;
