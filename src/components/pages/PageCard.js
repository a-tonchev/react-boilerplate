import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  Icon,
  IconButton,
  Grid,
} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Rating from '@material-ui/lab/Rating';
import CustomLink from '../common/customInputs/CustomLink';
import StringHelper from '../../helpers/StringHelper';
import CustomButton from '../common/customInputs/CustomButton';

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
  price: {
    fontWeight: 'bold',
    fontSize: '150%',
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
  favoriteEmptyIcon: {

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
    fontSize: '80%',
  },
}));

export default function PageCard({
  id,
  style,
  title,
  image,
}) {
  const classes = useStyles();
  const [raised, setRaised] = useState(false);
  const { t } = useTranslation();
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
          <CustomLink
            to={`/page/${id}/${StringHelper.slugify(title)}`}
            plain
          >
            <CardMedia
              className={classes.media}
              image={`/img/demo/${image}`}
              title="Paella dish"
            />
            <CardContent
              className={classes.cardContent}
            >
              <Typography className={classes.text}>
                {title}
              </Typography>
              <Typography className={classes.price}>
                $ 50.15
              </Typography>
              <Typography variant="caption">{`${t('by')} ${t('app.name')}`}</Typography>
            </CardContent>
            <div />
          </CustomLink>
          <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="favourite">
              <Icon fontSize="small" className={classes.favoriteEmptyIcon}>
                favorite_border
              </Icon>
            </IconButton>
            <CustomButton
              variant="text"
              className={classes.ratingBox}
              aria-label="rating"
            >
              <Rating
                name="read-only"
                value={5}
                size="small"
                readOnly
                color="primary"
                className={classes.rating}
              />
              <Typography
                className={classes.ratingText}
                variant="caption"
              >
                5
              </Typography>
            </CustomButton>
          </CardActions>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
