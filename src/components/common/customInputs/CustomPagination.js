import React from 'react';
import {
  Link, withRouter,
} from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles, withTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
  },
  pagination: {
    display: 'inline-block',
  },
}));

const CustomPagination = ({ location, theme }) => {
  const { isMobile } = theme;
  const classes = useStyles();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page'), 10) || 1;
  const { pathname } = location;
  return (
    <div className={classes.root}>
      <Pagination
        page={page}
        className={classes.pagination}
        count={10}
        color="primary"
        size="large"
        siblingCount={isMobile ? 0 : 1}
        renderItem={item => {
          const { page: itemPage } = item;
          query.set('page', itemPage);
          const newUrl = `${pathname}?${query.toString()}`;
          return (
            <PaginationItem
              component={Link}
              to={newUrl}
              {...item}
            />
          );
        }}
      />
    </div>
  );
};

export default withWidth()(withTheme(withRouter(CustomPagination)));
