import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { withRouter } from 'react-router-dom';
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

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    window.scroll({
      top: 0,
    });
    ref.current = value;
  }, [value]);

  return ref.current;
}

const PageList = ({ pages: items, location }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perPage] = useState(24);
  usePrevious(page);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1300);
  }, [page]);
  const pageItems = items.filter(
    (item, index) => index >= (perPage * page - perPage) && index < perPage * page,
  );
  const wrapClass = 'moving';
  return (
    <Grid container className={`${classes.gridList}`} spacing={0}>
      <PageListFilters key="pageListFilters" />
      <TransitionGroup
        id="page-transition"
        className={`page-transition ${wrapClass}`}
      >
        <CSSTransition
          key={location.key}
          timeout={{
            enter: 600,
            exit: 600,
          }}
          classNames="items"
        >
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {pageItems.map(
                ({ title, id, image }) => (
                  <PageCard
                    plain
                    style={{ height: 'auto' }}
                    title={title}
                    id={id}
                    key={id}
                    image={image}
                    loading={loading}
                  />
                ),
              )}
            </Grid>
          </Grid>
        </CSSTransition>
      </TransitionGroup>
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

export default withRouter(PageList);
