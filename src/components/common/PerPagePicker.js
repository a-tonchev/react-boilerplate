import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { perPageValues } from '../../config/ItemConfig';
import { ItemContext } from '../../contexts/ItemContext';
import CustomSelect from './customInputs/CustomSelect';

const useStyles = makeStyles(() => ({
  selectPerPage: {
    verticalAlign: 'top',
  },
}));

const PerPagePicker = () => {
  const classes = useStyles();
  const { itemsData, dispatchItemsData } = useContext(ItemContext);
  const { perPage } = itemsData;

  return (
    <CustomSelect
      className={classes.selectPerPage}
      fullWidth={false}
      name="perPage"
      value={perPage}
      onChange={({ value }) => {
        dispatchItemsData({
          type: 'SET_PER_PAGE',
          perPage: value,
        });
      }}
      options={
        perPageValues.map(val => ({
          value: val,
          text: val,
        }))
      }
    />
  );
};

export default PerPagePicker;
