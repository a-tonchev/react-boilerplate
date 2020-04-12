import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ItemCard from './ItemCard';
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
  const {
    pagingData,
    itemsData,
  } = useContext(ItemContext);
  const { pageData } = pagingData;
  const { perPage } = pageData;
  const { items, itemsMounted } = itemsData;
  const itemsList = items.map(
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
  if (loading || !itemsMounted) {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {getLoadingCards(perPage, classes)}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        {itemsList}
      </Grid>
    </Grid>
  );
};

export default withRouter(ItemsList);
