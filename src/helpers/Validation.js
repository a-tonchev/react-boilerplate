import _ from 'lodash';
import Validators from './Validators';

export default {
  validate(fieldsToValidate) {
    const error = {};
    const validFunction = (validator, key) => {
      const {
        text, type, value, customValidation,
      } = validator;
      if (!error[key]) {
        if (customValidation) {
          if (customValidation(value)) {
            error[key] = text;
          }
        } else if (!Validators[type](value)) { error[key] = text; }
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
    return !_.isEmpty(error) ? error : null;
  },
  getError(error, errorField) {
    if (!errorField) return error;
    return error && error[errorField] ? error[errorField] : null;
  },
  extendValidation(error, priorityError, validators) {
    if (!this.getError(error)) return priorityError;
    if (!this.getError(priorityError)) return error;
    const newError = {};
    for (const [key] of Object.entries(validators)) {
      if (priorityError[key]) newError[key] = priorityError[key];
      if (!priorityError[key] && error[key]) newError[key] = error[key];
    }
    return newError;
  },
};
