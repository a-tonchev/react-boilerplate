import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { useTranslation } from 'react-i18next';
import CustomPagination from '../common/customInputs/CustomPagination';
import SortByPicker from '../common/SortByPicker';
import ViewPicker from '../common/ViewPicker';
import PerPagePicker from '../common/PerPagePicker';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 20,
  },
  view: {
    textAlign: 'right',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  sort: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  dividerBox: {
    display: 'inline-block',
    height: 20,
    verticalAlign: 'middle',
  },
  selectPerPage: {
    verticalAlign: 'top',
  },
}));

const ItemsListFilters = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} className={classes.sort}>
          <Typography
            display="inline"
            variant="body1"
          > {t('sortBy')}:
          </Typography>
          <SortByPicker />
        </Grid>
        <Grid item xs={12} md={6} className={classes.view}>
          <ViewPicker />
          <PerPagePicker />
          <CustomPagination
            key="customPagination"
            showOne
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withWidth()(ItemsListFilters);
