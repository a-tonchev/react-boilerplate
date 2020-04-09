import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Icon,
  Typography,
  Card,
  Divider,
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import CustomButton from '../common/customInputs/CustomButton';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 20,
  },
  view: {
    textAlign: 'right',
  },
  dividerBox: {
    display: 'inline-block',
    height: 20,
    verticalAlign: 'middle',
  },
});

const PageListFilters = () => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6}>
          <Typography
            display="inline"
            variant="body1"
          >Sort by:
          </Typography>
          <Card
            className={classes.root}
            variant="outlined"
            display="inline"
          >
            <CustomButton
              variant="text"
              size="small"
              color="primary"
            >
              Best Match
            </CustomButton>
            <div className={classes.dividerBox}>
              <Divider className={classes.divider} orientation="vertical" />
            </div>
            <CustomButton
              variant="text"
              size="small"
            >
              Newest
            </CustomButton>
            <div className={classes.dividerBox}>
              <Divider className={classes.divider} orientation="vertical" />
            </div>
            <CustomButton
              variant="text"
              size="small"
            >
              Price
            </CustomButton>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.view}>
          <Typography
            display="inline"
            variant="body1"
          >View:
          </Typography>
          <IconButton>
            <Icon color="primary">view_module</Icon>
          </IconButton>
          <IconButton>
            <Icon>view_list</Icon>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withWidth()(PageListFilters);
