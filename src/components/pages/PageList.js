import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import PageCard from './PageCard';
import PageListFilters from './PageListFilters';
import CustomPagination from '../common/customInputs/CustomPagination';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 20,
  },
  gridList: {
    marginTop: '20px!Important',
  },
  view: {
    textAlign: 'right',
  },
  dividerBox: {
    display: 'inline-block',
    height: 20,
    verticalAlign: 'middle',
  },
  divider: {

  },
});

const PageList = ({ pages: items }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [perPage] = useState(30);

  const itemsPerPage = items.filter(
    (item, index) => index >= (perPage * page - perPage) && index < perPage * page,
  );
  return (
    <Grid container className={classes.gridList} spacing={2}>
      <PageListFilters key="pageListFilters" />
      {itemsPerPage.map(({ title, id, image }) => (
        <PageCard
          plain
          style={{ height: 'auto' }}
          title={title}
          id={id}
          key={id}
          image={image}
        />
      ))}
      <CustomPagination
        key="customPagination"
        setPage={setPage}
        perPage={perPage}
        page={page}
        total={items.length}
      />
    </Grid>
  );
};

export default withWidth()(PageList);
