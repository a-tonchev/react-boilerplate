import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ItemCard from './ItemCard';
import PageListFilters from './ItemsListFilters';
import CustomPagination from '../common/customInputs/CustomPagination';
import LoadingItem from '../common/loading/LoadingItem';
import { ItemContext } from '../../contexts/ItemContext';

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

const getLoadingCards = (perPage, classes) => {
  const cards = [];
  for (let i = 0; i < perPage; i++) {
    cards.push(<LoadingItem
      key={`loadingCard-${i}`}
      className={classes.root}
      style={{ height: 'auto' }}
    />);
  }
  return cards;
};


const ItemsList = ({
  loading,
}) => {
  const classes = useStyles();
  const { pagingData, preparedItems, itemsMounted } = useContext(ItemContext);
  const itemsList = preparedItems.map(
    ({ title, id, image }) => (
      <ItemCard
        plain
        title={title}
        id={id}
        key={id}
        image={image}
      />
    ),
  );
  return (
    <Grid container className={`${classes.gridList}`} spacing={0}>
      <PageListFilters
        key="pageListFilters"
      />
      {
        loading || !itemsMounted ? (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {getLoadingCards(pagingData.perPage, classes)}
            </Grid>
          </Grid>
        )
          : (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {itemsList}
              </Grid>
            </Grid>
          )
      }
      <CustomPagination
        key="customPagination"
      />
    </Grid>
  );
};

export default withRouter(ItemsList);
