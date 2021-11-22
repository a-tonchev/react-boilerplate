import { useEffect } from 'react';

import useError from '@/components/validations/hooks/useError';

import useValues from './useValues';
import ValuesContent from '../ValuesContent';

const useValuesContent = ({
  defaultValues,
  inputs = [],
  validations = {},
}) => {
  const { values, handleChange, resetValues } = useValues({ defaultValues });

  const {
    error,
    isError,
    getActivateError,
    deactivateError,
  } = useError({ values, validations });

  useEffect(() => {
    resetValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs, defaultValues]);

  return {
    Content: <ValuesContent
      onChange={handleChange}
      inputs={inputs}
      values={values}
      isError={isError}
      error={error}
    />,
    values,
    getActivateError,
    deactivateError,
  };
};

export default useValuesContent;
