import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Validation from '../../../helpers/Validation';

const useErrorCheck = ({ values, validations, active = false }) => {
  const [error, setError] = useState(null);
  const [customError, setCustomError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [errorActive, activateError] = useState(active);
  const { t } = useTranslation();

  useEffect(() => {
    const preparedValidations = {};
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
    const validationErrors = Validation.validate(preparedValidations);
    setValidationError(validationErrors);
    setError(Validation.extendValidation(validationErrors, customError, validations));
  }, [values, t, validations, customError, active]);

  const isError = fieldToTest => {
    if (!errorActive) return false;
    return Validation.getError(error, fieldToTest);
  };
  const getActivateError = () => {
    activateError(true);
    return Validation.getError(validationError);
  };
  return {
    error,
    setCustomError,
    isError,
    getActivateError,
  };
};

export default useErrorCheck;
