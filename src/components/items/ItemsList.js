import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ItemCard from './ItemCard';
import LoadingItem from '../common/loading/LoadingItem';
import { ItemContext } from '../../contexts/ItemContext';
import ItemCardFlat from './ItemCardFlat';

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
    itemsData,
  } = useContext(ItemContext);
  const {
    perPage, items, itemsMounted, view,
  } = itemsData;

  if (loading || !itemsMounted) {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {getLoadingCards(perPage, classes)}
        </Grid>
      </Grid>
    );
  }

  const ItemWrapToUse = view === 'tiles' ? ItemCard : ItemCardFlat;

  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        {items.map(
          ({ title, id, image }) => (
            <ItemWrapToUse
              title={title}
              id={id}
              key={id}
              image={image}
            />
          ),
        )}
      </Grid>
    </Grid>
  );
};

export default withRouter(ItemsList);
