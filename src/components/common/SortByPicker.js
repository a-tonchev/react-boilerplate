import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Card, Divider, TableSortLabel } from '@material-ui/core';
import { sortingTypes } from '../../config/ItemConfig';
import CustomButton from './customInputs/CustomButton';
import { ItemContext } from '../../contexts/ItemContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 20,
  },
  dividerBox: {
    display: 'inline-block',
    height: 20,
    verticalAlign: 'middle',
  },
}));

const SortByPicker = () => {
  const classes = useStyles();
  const { itemsData, dispatchItemsData } = useContext(ItemContext);
  const { sortBy, sortDirection } = itemsData;
  const { t } = useTranslation();

  return (
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
  );
};

export default SortByPicker;
