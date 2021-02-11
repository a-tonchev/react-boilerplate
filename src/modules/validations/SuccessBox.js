import { Done } from '@material-ui/icons';
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  icon: {
    color: 'green',
    margin: 15,
    fontSize: '4rem',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const SuccessBox = ({ text, button }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Container maxWidth="md">
      <div className={classes.paper}>
        <Done className={classes.icon} />
        <Typography align="center" variant="h5">{t(text)}</Typography>
        {button || ''}
      </div>
    </Container>
  );
};

export default SuccessBox;
