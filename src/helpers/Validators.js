export default {
  isEmail(email) {
    return email && !!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
  },
  isEmpty(field) {
    return field && field.length;
  },
  isTrue(field) {
    return !!field;
  },
  validate(fieldsToValidate) {
    const error = {
      general: false,
    };
    const validFunction = (validator, key) => {
      const {
        text, type, value, customValidation,
      } = validator;
      if (!error[key]) {
        if (customValidation) {
          if (customValidation()) {
            error[key] = text;
            error.general = true;
          }
        } else if (!this[type](value)) { error[key] = text; error.general = true; }
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
    return error;
  },
  getError(error, errorField) {
    if (!errorField) return error && error.general;
    return error && error.general && error[errorField] ? error[errorField] : null;
  },
};
