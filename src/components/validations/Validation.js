import _isEmpty from 'lodash-es/isEmpty';
import _get from 'lodash-es/get';
import _set from 'lodash-es/set';

import Validators from './Validators';

export default {
  validate(fieldsToValidate) {
    const error = {};
    const validFunction = (validator, key) => {
      const {
        text, type, value, customValidation,
      } = validator;
      if (!_get(error, key)) {
        if (customValidation) {
          if (!customValidation(value)) {
            _set(error, key, text);
          }
        } else if (!Validators[type](value)) {
          _set(error, key, text);
        }
      }
    };
    for (const [key, validators] of Object.entries(fieldsToValidate)) {
      if (Array.isArray(validators) && validators.length) {
        validators.forEach(validator => {
          validFunction(validator, key);
        });
      } else {
        validFunction(validators, key);
      }
    }
    return !_isEmpty(error) ? error : null;
  },
  getError(error, errorField) {
    if (!errorField) return error;
    return _get(error, errorField, '');
  },
  extendValidation(error, priorityError, validators) {
    if (!this.getError(error)) return priorityError;
    if (!this.getError(priorityError)) return error;
    const newError = {};
    for (const [key] of Object.entries(validators)) {
      const priorityErrorValue = _get(priorityError, key);
      if (priorityErrorValue) _set(newError, key, priorityErrorValue);
      if (!priorityErrorValue && _get(error, key)) _set(newError, key, _get(error, key));
    }
    return newError;
  },
};
