import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
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
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    padding: 4,
  },
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginTop: 5,
  },
  starIcon: {
    fontSize: '80%',
  },
  cardActions: {
    padding: 0,
  },
  ratingText: {
    marginLeft: 2,
  },
  ratingBox: {
    marginLeft: 'auto',
    marginRight: 4,
  },
  rating: {
    width: 80,
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
    height: 20,
  },
}));

export default function LoadingItem({
  id,
  style,
}) {
  const classes = useStyles();
  const [raised, setRaised] = useState(false);
  return (
    <Grid
      item
      xs={6}
      md={3}
      lg={2}
      key={id}
      className={classes.root}
      style={style}
    >
      <CardActionArea
        component="div"
      >
        <Card
          onMouseOver={() => setRaised(true)}
          onFocus={() => setRaised(true)}
          onMouseOut={() => setRaised(false)}
          onBlur={() => setRaised(false)}
          elevation={raised ? 3 : 0}
        >
          <Skeleton
            className={classes.media}
            classes={{
              root: classes.imageSkeleton,
            }}
            variant="rect"
            animation="wave"
          />
          <CardContent
            className={classes.cardContent}
          >
            <Skeleton animation="wave" variant="text" className={classes.upperText} />
            <Skeleton animation="wave" variant="text" className={classes.price} height={30} />
            <Skeleton animation="wave" variant="text" className={classes.bottomText} />
          </CardContent>
          <div />
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="favourite">
              <Skeleton
                animation="wave"
                variant="text"
                className={classes.favouriteIcon}
              />
            </IconButton>
            <CustomButton
              variant="text"
              className={classes.ratingBox}
              aria-label="rating"
            >
              <Skeleton
                animation="wave"
                variant="text"
                className={classes.rating}
              />
            </CustomButton>
          </CardActions>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
