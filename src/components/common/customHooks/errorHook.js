import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Validators from '../../../helpers/Validators';

const useErrorCheck = ({ values, validations }) => {
  const [error, setError] = useState(null);
  const [customError, setCustomErrors] = useState(null);
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

  const isError = Validators.getError;

  return [error, setCustomErrors, isError];
};

export default useErrorCheck;
