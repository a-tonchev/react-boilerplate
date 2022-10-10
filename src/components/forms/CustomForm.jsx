import { useState } from 'react';

import CustomButton from '../inputs/CustomButton';
import CustomCheckBox from '../inputs/CustomCheckBox';
import CustomTextField from '../inputs/CustomTextField';
import useClasses from '../layout/hooks/useClasses';

const styles = {
  button: {
    marginTop: '0.5rem',
  },
};

export default function CustomForm({ elements, onSubmit }) {
  const classes = useClasses(styles);
  const [formValues, setFormValues] = useState(
    elements.map(element => {
      const valueToReturn = element.defaultValue || element.type === 'checkbox' ? false : '';
      return { label: element.label, value: valueToReturn };
    }),
  );

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formValues);
  }

  function handleChange(newValue, newIndex) {
    setFormValues(prev => prev.map((oldFormValue, oldIndex) => {
      if (newIndex === oldIndex) {
        return { label: oldFormValue.label, value: newValue.value };
      }
      return oldFormValue;
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      {elements.map((inputElementData, index) => (
        <InputElement
          key={inputElementData.label}
          value={formValues[index].value}
          onChange={newValue => handleChange(newValue, index)}
          {...inputElementData}
        />
      ))}
      <CustomButton className={classes.button} text="Submit" type="submit" fullMobile>
        Submit
      </CustomButton>
    </form>
  );
}

const InputElement = ({ defaultValue, ...propsToPass }) => {
  const { type, value } = propsToPass;

  switch (type) {
    case 'text':
      return <CustomTextField {...propsToPass} />;
    case 'textarea':
      return <CustomTextField multiline rows={3} {...propsToPass} />;
    case 'number':
      return <CustomTextField type="number" {...propsToPass} />;
    case 'checkbox':
      return <CustomCheckBox checked={value} fullWidth {...propsToPass} />;
    default:
      return null;
  }
};
