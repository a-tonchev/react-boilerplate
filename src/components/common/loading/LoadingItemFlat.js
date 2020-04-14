import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Grid,
  CardContent,
  CardActions,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CustomButton from '../customInputs/CustomButton';

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    height: 'auto',
    borderBottom: '1px solid #ddd',
    zIndex: 1000,
  },
  media: {
    height: 0,
    paddingTop: '100%',
    position: 'relative',
  },
  cardContent: {
    padding: 4,
  },
  cardActions: {
    padding: 0,
  },
  rating: {
    width: 70,
  },
  imageSkeleton: {
    marginTop: 0,
  },
  bottomText: {
    marginTop: 6,
    width: '50%',
  },
  price: {
    marginTop: 4,
    width: '50%',
  },
  favouriteIcon: {
    width: '1em',
    height: '1em',
  },
  upperText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    maxWidth: 450,
  },
  mediaGrid: {
    padding: 10,
  },
}));

export default function LoadingItem() {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      className={classes.root}
    >
      <Grid container>
        <Grid item xs={5} sm={3} md={2}>
          <Skeleton
            className={classes.media}
            classes={{
              root: classes.imageSkeleton,
            }}
            variant="rect"
            animation="wave"
          />
        </Grid>
        <Grid item xs={7} sm={9} md={10}>
          <Grid container>
            <Grid item xs={12} md={8} className={classes.mediaGrid}>
              <Skeleton animation="wave" variant="text" className={classes.upperText} height={55} />
            </Grid>
            <Grid item xs={12} md={4}>
              <CardContent
                className={classes.cardContent}
              >
                <Skeleton animation="wave" variant="text" className={classes.price} height={35} />
                <Skeleton animation="wave" variant="text" className={classes.bottomText} />
              </CardContent>
              <div />
              <CardActions disableSpacing className={classes.cardActions}>
                <CustomButton
                  variant="text"
                  aria-label="rating"
                >
                  <Skeleton
                    animation="wave"
                    variant="text"
                    className={classes.rating}
                  />
                </CustomButton>
                <IconButton aria-label="favourite">
                  <Skeleton
                    animation="wave"
                    variant="text"
                    className={classes.favouriteIcon}
                  />
                </IconButton>
              </CardActions>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
