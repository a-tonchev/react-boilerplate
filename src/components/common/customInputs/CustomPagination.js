import React, { useContext, useState, useEffect } from 'react';
import {
  Link, withRouter,
} from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import { ItemContext } from '../../../contexts/ItemContext';
import Loading from '../loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
  },
  showOneRoot: {
    display: 'inline-block',
    minWidth: 84,
  },
  pagination: {
    display: 'inline-block',
  },
}));

const CustomPagination = ({
  theme,
  location,
  showOne,
}) => {
  const [pPage, setPPage] = useState(1);
  const { filtersData, itemsData } = useContext(ItemContext);
  const { itemsMounted } = itemsData;
  const { totalPages = 1, setPage = () => {}, pageData } = filtersData;
  const {
    page = 1,
  } = pageData;

  const { isMobile } = theme;
  const classes = useStyles();
  const query = new URLSearchParams(location.search);
  const { pathname } = location;

  const handleChange = (event, value) => {
    setPPage(value);
    setPage(value);
    if (!showOne) {
      window.scrollTo({ top: 0, left: 0 });
    }
  };

  useEffect(() => {
    if (page !== pPage) {
      setPPage(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={showOne ? classes.showOneRoot : classes.root}>
      {!itemsMounted ? <Loading /> : (
        <Pagination
          page={pPage}
          onChange={handleChange}
          className={classes.pagination}
          count={totalPages}
          color="primary"
          size={showOne ? 'small' : 'large'}
          siblingCount={isMobile ? 0 : 1}
          renderItem={item => {
            const { page: itemPage, type, selected } = item;
            query.set('page', itemPage);
            const newUrl = `${pathname}?${query.toString()}`;
            if (
              (showOne
            && !selected
            && type === 'page')
            || (type === 'end-ellipsis'
            || type === 'start-ellipsis')
            ) return <div />;
            return (
              <PaginationItem
                component={Link}
                to={newUrl}
                {...item}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default withWidth()(withTheme(withRouter(CustomPagination)));
