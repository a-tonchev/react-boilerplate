import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Authorized from './common/Authorized';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 360,
  },
});

const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/img/demo.jpg"
          title="Demo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Hello React Home!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This page is demo home page, you can test the functionality with
            login as username user, password user or username admin, password admin for admin.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Authorized publicOnly>
          <Link to="/login">
            <Button size="small" color="primary">
              {t('login')}
            </Button>
          </Link>
        </Authorized>
      </CardActions>
    </Card>
  );
};

export default Home;
