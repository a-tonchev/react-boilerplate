import React, { useEffect } from 'react';
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

const CustomPagination = ({
  page, theme, perPage, total = 0, setPage, location, history,
}) => {
  const { isMobile } = theme;
  const classes = useStyles();
  const query = new URLSearchParams(location.search);
  const queryPage = parseInt(query.get('page'), 10) || 1;
  const { pathname } = location;
  console.log(location.key);
  const totalPages = Math.ceil(total / perPage);
  useEffect(() => {
    if (queryPage > totalPages) {
      query.delete('page');
      const newUrl = `${pathname}?${query.toString()}`;
      history.push(newUrl);
    } else if (queryPage !== page) setPage(queryPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className={classes.root}>
      <Pagination
        page={page}
        onChange={handleChange}
        className={classes.pagination}
        count={!total ? 1 : totalPages}
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
