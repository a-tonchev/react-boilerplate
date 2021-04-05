import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _get from 'lodash-es/get';
import _set from 'lodash-es/set';
import _isEmpty from 'lodash-es/isEmpty';
import Validation from '../Validation';
import i18n from '../../translations/i18n';

const convertErrorArray = (errors, validations) => {
  const newError = {};
  if (!validations) return newError;
  errors.forEach(error => {
    if (i18n.exists(`errorDescription.${error}`)) {
      _set(newError, error, `errorDescription.${error}`);
    } else if (_get(validations, error)) {
      _set(newError, error, _get(validations, error).text);
    } else {
      _set(newError, error, 'field.notValidOrRequired');
    }
  });
  return newError;
};

const useError = ({ values, validations, active = false }) => {
  const [error, setError] = useState(null);
  const [customError, setCustomError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [errorActive, activateError] = useState(active);
  const { t } = useTranslation();

  useEffect(() => {
    if (!_isEmpty(values)) {
      const preparedValidations = {};
      for (const [key, validator] of Object.entries(validations)) {
        const validFunction = val => ({
          ...val,
          text: val.text ? t(val.text) : t('field.notValidOrRequired'),
          value: _get(values, key),
        });
        if (Array.isArray(validator) && validator.length) {
          _set(preparedValidations, key, validator.map(val => validFunction(val)));
        } else {
          _set(preparedValidations, key, validFunction(validator));
        }
      }
      const validationErrors = Validation.validate(preparedValidations);
      setValidationError(validationErrors);
      setError(Validation.extendValidation(validationErrors, customError, validations));
    } else {
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, t, customError, active]);

  const isError = fieldToTest => {
    if (!errorActive) return null;
    return Validation.getError(error, fieldToTest);
  };

  const getActivateError = () => {
    activateError(true);
    return Validation.getError(validationError);
  };

  const deactivateError = () => {
    activateError(false);
  };

  return {
    error,
    setCustomError,
    isError,
    errorActive,
    getActivateError,
    deactivateError,
    convertErrorArray,
  };
};

export default useError;
