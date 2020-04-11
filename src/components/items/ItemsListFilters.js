import React, { useContext } from 'react';
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
import CustomSelect from '../common/customInputs/CustomSelect';
import CustomPagination from '../common/customInputs/CustomPagination';
import { ItemContext } from '../../contexts/ItemContext';

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

const ItemsListFilters = ({

}) => {
  const classes = useStyles();

  const { pagingData } = useContext(ItemContext);
  const { setPerPage = () => {}, perPage = 24 } = pagingData;
  const changePerPage = ({ value }) => {
    setPerPage(value);
  };
  return (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} className={classes.sort}>
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
        <Grid item xs={12} md={6} className={classes.view}>
          <IconButton>
            <Icon color="primary">view_module</Icon>
          </IconButton>
          <IconButton>
            <Icon>view_list</Icon>
          </IconButton>
          <CustomSelect
            className={classes.selectPerPage}
            fullWidth={false}
            name="perPage"
            value={perPage}
            onChange={changePerPage}
            options={[{
              value: 24,
              text: '24',
            }, {
              value: 48,
              text: '48',
            },
            ]}
          />
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
