import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import Connections from '../../helpers/Connections';
import useLoading from '../common/customHooks/loadingHook';
import PageList from './PageList';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  divider: {
    width: '100%',
  },
});

const AllPages = () => {
  const classes = useStyles();
  const [pages, setPages] = useState([]);
  const { loading, Loading, setLoading } = useLoading(true);
  useEffect(() => {
    const getPages = async () => {
      const allPages = await Connections.getFakePages();
      if (allPages && allPages.length) setPages(allPages);
      setLoading(false);
    };
    getPages().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <Grid container spacing={1} className={classes.root}>
      <PageList pages={[...pages, ...pages, ...pages, ...pages]} />
    </Grid>
  );
};

export default AllPages;
