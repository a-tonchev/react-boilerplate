import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Breadcrumbs,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet/es/Helmet';
import Rating from '@material-ui/lab/Rating';
import ImageGallery from 'react-image-gallery';
import useLoading from '../common/customHooks/loadingHook';
import Connections from '../../helpers/Connections';
import CustomLink from '../common/customInputs/CustomLink';
import CustomButton from '../common/customInputs/CustomButton';

const useStyles = makeStyles({
  root: {
  },
  breadcrumbs: {
    marginTop: 10,
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 2,
    // color: '#ff4747',
    // color: '#d0011b',
    fontWeight: 'bold',
  },
  rating: {
    // color: '#d0011b',
    color: '#ff4747',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.7rem',
  },
  text: {
    padding: 20,
  },
  image: {
    '& div': {
      width: '100%',
      paddingTop: '100%',
      position: 'relative',
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'fill !Important',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  thumbnail: {
    width: 90,
    '& div': {
      width: '100%',
      paddingTop: '100%',
      position: 'relative',
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'fill !Important',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
});

const defaultValues = {
  title: '',
  image: '',
  description: '',
  text: '',
};

const Item = ({ match }) => {
  const { itemId } = match.params;
  const classes = useStyles();
  const { t } = useTranslation();
  const [item, setItem] = useState(defaultValues);
  const { loading, Loading, setLoading } = useLoading(true);

  useEffect(() => {
    const getItem = async () => {
      const newItem = await Connections.getFakeItem(parseInt(itemId));
      setItem(newItem);
      setLoading(false);
    };
    getItem().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  if (loading) return <Loading />;

  const {
    title,
    image,
    description,
    text,
  } = item;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Helmet>
            <title>{title} | {t('app.title')}</title>
            <meta name="description" content={`${t('app.description')} | ITEM`} />
          </Helmet>
          <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
            <CustomLink plain color="inherit" to="/">
              All Items
            </CustomLink>
            <CustomLink plain color="inherit" to="/">
              Category
            </CustomLink>
            <Typography color="textPrimary">{title}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} sm={6} md={5}>
          <ImageGallery
            additionalClass="test-iMG"
            items={[
              {
                original: `/img/demo/${image}`,
                thumbnail: `/img/demo/${image}`,
                originalClass: classes.image,
                thumbnailClass: classes.thumbnail,
              },
              {
                original: '/img/demo/page-3.jpg',
                thumbnail: '/img/demo/page-3.jpg',
                originalClass: classes.image,
                thumbnailClass: classes.thumbnail,
              },
              {
                original: '/img/demo/page-4.jpg',
                thumbnail: '/img/demo/page-4.jpg',
                originalClass: classes.image,
                thumbnailClass: classes.thumbnail,
              },
              {
                original: '/img/demo/page-5.jpg',
                thumbnail: '/img/demo/page-5.jpg',
                originalClass: classes.image,
                thumbnailClass: classes.thumbnail,
              },
              {
                original: '/img/demo/page-6.jpg',
                thumbnail: '/img/demo/page-6.jpg',
                originalClass: classes.image,
                thumbnailClass: classes.thumbnail,
              },
            ]}
            showPlayButton={false}
            slideDuration={0}
            slideOnThumbnailOver
            useBrowserFullscreen={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <Typography variant="h1">
            {title}
          </Typography>
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
            >
              5
            </Typography>
          </CustomButton>
          <Typography className={classes.price}>
            $ 50.15
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.text}>
          <Typography variant="body1">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Item;
