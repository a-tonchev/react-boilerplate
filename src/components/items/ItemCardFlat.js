import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import {
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
import UrlEnums from '../../enums/UrlEnums';

const useStyles = makeStyles(() => ({
  root: {
    boxSizing: 'border-box',
    height: 'auto',
    borderBottom: '1px solid #ddd',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
    position: 'relative',
  },
  cardContent: {
    padding: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: '150%',
  },
  text: {
    // whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: 10,
    minHeight: 21,
    maxHeight: 50,
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    maxWidth: 450,
  },
  cardActions: {
    padding: 0,
  },
  ratingText: {
    marginLeft: 2,
  },
  rating: {
    fontSize: '80%',
  },
  card: {
    boxShadow: 'none',
  },
}));

const WrapInCardActionLink = ({ children, title, id }) => (
  <CardActionArea
    component="div"
  >
    <CustomLink
      to={`/page/${id}/${StringHelper.slugify(title)}`}
      plain
    >
      {children}
    </CustomLink>
  </CardActionArea>
);

const ItemCard = ({
  id,
  title,
  image,
  theme,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { isMobile } = theme;
  const ItemBase = (
    <Grid container>
      <Grid item xs={5} sm={3} md={2}>
        {isMobile ? (
          <CardMedia
            className={classes.media}
            image={`/img/demo/${image}`}
          />
        ) : (
          <CustomLink
            to={`${UrlEnums.ITEM_BASE}/${id}/${StringHelper.slugify(title)}`}
            plain
          >
            <CardActionArea
              component="div"
            >
              <CardMedia
                className={classes.media}
                image={`/img/demo/${image}`}
              />
            </CardActionArea>
          </CustomLink>
        )}
      </Grid>
      <Grid item xs={7} sm={9} md={10}>
        <Grid container>
          <Grid item xs={12} md={8}>
            {isMobile ? (
              <Typography variant="subtitle1" className={classes.text}>
                {title}
              </Typography>
            ) : (
              <CustomLink
                to={`${UrlEnums.ITEM_BASE}/${id}/${StringHelper.slugify(title)}`}
                plain
              >
                <Typography variant="subtitle1" className={classes.text}>
                  {title}
                </Typography>
              </CustomLink>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <CardContent
              className={classes.cardContent}
            >
              <Typography className={classes.price}>
                $ 50.15
              </Typography>
              <Typography variant="caption">{`${t('by')} ${t('app.name')}`}</Typography>
            </CardContent>
            <div />
            <CardActions disableSpacing className={classes.cardActions}>
              <CustomButton
                variant="text"
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
              <IconButton aria-label="favourite">
                <Icon fontSize="small">
                  favorite_border
                </Icon>
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <Grid
      item
      xs={12}
      key={id}
      className={classes.root}
    >
      {isMobile ? (
        <WrapInCardActionLink title={title} id={id}>
          {ItemBase}
        </WrapInCardActionLink>
      ) : ItemBase}
    </Grid>
  );
};

export default withTheme(ItemCard);
