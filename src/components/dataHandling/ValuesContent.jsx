import React from 'react';
import get from 'lodash-es/get';
import {
  Grid,
} from '@mui/material';

import CustomCodeBlock from './CustomCodeBlock';

import CustomSelect from '@/components/inputs/CustomSelect';
import CustomTextField from '@/components/inputs/CustomTextField';
import CustomCheckBox from '@/components/inputs/CustomCheckBox';

const getComponentByType = type => {
  switch (type) {
    case 'text':
      return CustomTextField;
    case 'select':
      return CustomSelect;
    case 'checkbox':
      return CustomCheckBox;
    case 'code':
      return CustomCodeBlock;
    default:
      return CustomTextField;
  }
};

const ValuesContent = ({
  inputs = [],
  onChange,
  values,
  isError,
}) => (
  <Grid container>
    {inputs.map((inputData, index) => {
      const {
        inputType, props, gridProps = { xs: 12 }, key = `values_dialog_input_${index}`,
      } = inputData;
      const { name } = props;

      const value = get(values, name, '');

      const InputComponent = getComponentByType(inputType);

      return (
        <Grid item {...gridProps} key={key}>
          <InputComponent
            fullWidth
            onChange={onChange}
            {...props}
            value={value}
            error={isError ? isError(name) : ''}
          />
        </Grid>
      );
    })}
  </Grid>
);

export default ValuesContent;
