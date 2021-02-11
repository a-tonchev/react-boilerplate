import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet/es/Helmet';
import Authorized from './auth/Authorized';
import CustomLink from './common/customInputs/CustomLink';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 160,
  },
});

const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('app.title')} | Home</title>
        <meta name="description" content={`${t('app.description')} | Home`} />
      </Helmet>
      <Card className={classes.root} elevation={0}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Hello {'firstName' || 'React - Home' }!
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {t('welcome.text')}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Authorized publicOnly>
            <CustomLink button to="/login">
              {t('login')}
            </CustomLink>
          </Authorized>
        </CardActions>
      </Card>
    </>
  );
};

export default Home;
