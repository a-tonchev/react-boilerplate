import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Validators from '../../../helpers/Validators';

const useErrorCheck = ({ values, validations, active = false }) => {
  const [error, setError] = useState(null);
  const [customError, setCustomErrors] = useState(null);
  const [errorActive, activateError] = useState(active);
  const { t } = useTranslation();
  useEffect(() => {
    let validationErrors = null;
    if (customError) {
      validationErrors = { ...customError, general: true };
    }
    setError(validationErrors);
  }, [customError]);
  useEffect(() => {
    const preparedValidations = {};
    setCustomErrors(null);
    for (const [key, validator] of Object.entries(validations)) {
      const validFunction = val => ({
        ...val,
        text: t(val.text),
        value: values[key],
      });
      if (Array.isArray(validator) && validator.length) {
        preparedValidations[key] = validator.map(val => validFunction(val));
      } else {
        preparedValidations[key] = validFunction(validator);
      }
    }
    const validationErrors = Validators.validate(preparedValidations);

    setError(validationErrors);
  }, [values, t, validations]);

  const isError = errorActive ? Validators.getError : () => false;
  const getActivateError = () => {
    activateError(true);
    return Validators.getError(error);
  };
  return [error, setCustomErrors, isError, getActivateError];
};

export default useErrorCheck;
