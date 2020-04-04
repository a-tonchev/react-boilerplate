import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  Icon,
  IconButton,
} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
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
    fontWeight: 'bold',
  },
  ratingBox: {
    marginLeft: 'auto',
    marginRight: 4,
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
    <CardActionArea
      className={classes.root}
      style={style}
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
          <IconButton>
            <Icon fontSize="small" className={classes.favoriteEmptyIcon}>
              favorite_border
            </Icon>
          </IconButton>
          <CustomButton
            variant="text"
            className={classes.ratingBox}

          >
            <Icon color="primary" fontSize="small" className={classes.starIcon}>star</Icon>
            <Icon color="primary" fontSize="small" className={classes.starIcon}>star</Icon>
            <Icon color="primary" fontSize="small" className={classes.starIcon}>star</Icon>
            <Icon color="primary" fontSize="small" className={classes.starIcon}>star</Icon>
            <Icon color="primary" fontSize="small" className={classes.starIcon}>star</Icon>
            <Typography className={classes.ratingText} color="primary" variant="caption">
              5
            </Typography>
          </CustomButton>
        </CardActions>
      </Card>
    </CardActionArea>
  );
}
