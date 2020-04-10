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

function usePrevious(value, isMobile) {
  const ref = useRef();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: isMobile ? 'auto' : 'smooth',
    });
    ref.current = value;
  }, [value]);

  return ref.current;
}

const PageList = ({ pages: items, location, theme }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [perPage] = useState(24);
  const { isMobile } = theme;
  const previousPage = usePrevious(page, isMobile);
  const itemsPerPage = items.filter(
    (item, index) => index >= (perPage * page - perPage) && index < perPage * page,
  );
  const wrapClass = 'moving';
  /*
  if (previousPage - 1 === page) {
    wrapClass = 'moving-backward';
  }
  if (page - 1 === previousPage) {
    wrapClass = 'moving-forward';
  }
*/
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
            enter: 1000,
            exit: 1000,
          }}
          classNames="items"
        >
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {itemsPerPage.map(
                ({ title, id, image }) => (
                  <PageCard
                    plain
                    style={{ height: 'auto' }}
                    title={title}
                    id={id}
                    key={id}
                    image={image}
                  />
                ),
              )}
            </Grid>
          </Grid>
          {/* <>
            <div className="test-class">
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {itemsPerPage.map(
                    ({ title, id, image }) => (
                      <PageCard
                        plain
                        style={{ height: 'auto' }}
                        title={title}
                        id={id}
                        key={id}
                        image={image}
                      />
                    ),
                  )}
                </Grid>
              </Grid>
            </div>
            <div className="test-class-2">
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {itemsPerPage.map(
                    ({ title, id, image }) => (
                      <PageCard
                        plain
                        style={{ height: 'auto' }}
                        title={title}
                        id={id}
                        key={id}
                        image={image}
                      />
                    ),
                  )}
                </Grid>
              </Grid>
            </div>
          </> */}
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

export default withTheme(withRouter(PageList));
