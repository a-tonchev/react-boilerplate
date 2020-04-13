import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  IconButton,
  Icon,
  Typography,
  Card,
  Divider,
  TableSortLabel,
} from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { useTranslation } from 'react-i18next';
import CustomButton from '../common/customInputs/CustomButton';
import CustomSelect from '../common/customInputs/CustomSelect';
import CustomPagination from '../common/customInputs/CustomPagination';
import { ItemContext } from '../../contexts/ItemContext';
import { sortingTypes, perPageValues } from '../../config/ItemConfig';

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

  const { itemsData, dispatchItemsData } = useContext(ItemContext);
  const { perPage, sortBy, sortDirection } = itemsData;

  const changePerPage = ({ value }) => {
    dispatchItemsData({
      type: 'SET_PER_PAGE',
      perPage: value,
    });
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} className={classes.sort}>
          <Typography
            display="inline"
            variant="body1"
          > {t('sortBy')}:
          </Typography>
          <Card
            className={classes.root}
            variant="outlined"
            display="inline"
          >
            {
              sortingTypes.map((st, index) => {
                const { name: itemSortBy, directions, translation } = st;
                const showSort = sortBy === itemSortBy && directions.length > 1;
                let directionForNextSort = directions[0];
                if (showSort) {
                  directionForNextSort = sortDirection === directions[0] ? directions[1] : directionForNextSort;
                }

                return (
                  <span key={itemSortBy}>
                    <CustomButton
                      variant="text"
                      size="small"
                      color={sortBy === itemSortBy ? 'primary' : 'default'}
                      onClick={() => dispatchItemsData({
                        sortBy: itemSortBy,
                        sortDirection: directionForNextSort,
                        type: 'SET_SORT_BY',
                      })}
                    >
                      {showSort && (
                      <TableSortLabel
                        active
                        direction={sortDirection}
                        onClick={() => {}}
                      />
                      )}
                      {t(translation)}
                    </CustomButton>
                    {index < sortingTypes.length - 1 && (
                    <div className={classes.dividerBox}>
                      <Divider className={classes.divider} orientation="vertical" />
                    </div>
                    )}
                  </span>
                );
              })
            }
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
            options={
              perPageValues.map(val => ({
                value: val,
                text: val,
              }))
            }
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
