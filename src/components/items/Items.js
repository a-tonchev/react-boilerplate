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
    marginTop: 40,
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

  const queryPage = UrlHelper.getIntParam('page', 1);
  const queryPerPage = UrlHelper.getIntParam('perPage', perPageValues[0]);
  const querySortBy = UrlHelper.getParam('sortBy');
  const querySortDirection = UrlHelper.getParam('sortDirection');

  const {
    page,
    perPage,
    sortBy,
    sortDirection,
    mounted,
    view,
  } = itemsData;

  useEffect(() => {
    let anyChange = false;
    const newItemData = {};
    if (!mounted) {
      newItemData.mounted = true;
      anyChange = true;
    }

    if (queryPage && queryPage !== page) {
      newItemData.page = queryPage;
      anyChange = true;
    }

    const sortingType = sortingTypes.find(st => st.name === querySortBy);
    if (querySortBy && querySortBy !== sortBy && sortingType) {
      newItemData.sortBy = querySortBy;
      anyChange = true;
    }

    if (
      querySortDirection
      && querySortDirection !== sortDirection
      && sortingType.directions.includes(querySortDirection)
    ) {
      newItemData.sortDirection = querySortDirection;
      anyChange = true;
    }

    const storedView = LocalStorage.get('view');

    if (storedView !== view) {
      newItemData.view = storedView;
      anyChange = true;
    }
    if (
      queryPerPage
      && queryPerPage !== perPage
      && !perPageValues.includes(queryPerPage)
    ) {
      newItemData.perPage = queryPerPage;
      anyChange = true;
    }

    if (anyChange) dispatchItemsData(newItemData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPage, queryPerPage, querySortBy, querySortDirection]);

  if (!mounted) return <Loading />;

  return <ItemsBase />;
};

export default Items;
