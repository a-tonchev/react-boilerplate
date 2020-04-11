import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import Connections from '../../helpers/Connections';
import useLoading from '../common/customHooks/loadingHook';
import ItemsList from './ItemsList';
import { ItemContext } from '../../contexts/ItemContext';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  divider: {
    width: '100%',
  },
});

const AllItems = () => {
  const classes = useStyles();
  const { loading, setLoading } = useLoading(true);

  const {
    pagingData,
    setPreparedItems,
    setAllItems,
    allItems,
    setItemsMounted,
  } = useContext(ItemContext);
  const { perPage = 24, page = 1 } = pagingData;
  const changeItems = () => {
    const newPageItems = allItems.filter(
      (item, index) => index >= (perPage * page - perPage)
        && index < perPage * page,
    );
    setPreparedItems(newPageItems);
  };

  const getItems = async () => {
    const newItems = await Connections.getFakePages();
    if (newItems && newItems.length) {
      setAllItems(newItems);
    } else {
      setItemsMounted(true);
    }
  };

  useEffect(() => {
    getItems().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      changeItems();
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, allItems]);

  return (
    <Grid container spacing={1} className={classes.root}>
      <ItemsList
        loading={loading}
      />
    </Grid>
  );
};

export default AllItems;
