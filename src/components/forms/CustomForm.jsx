import { useState } from 'react';

import CustomButton from '../inputs/CustomButton';
import CustomCheckBox from '../inputs/CustomCheckBox';
import CustomTextField from '../inputs/CustomTextField';

export default function CustomForm({ elements, onSubmit }) {
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
      <CustomButton text="Submit" type="submit" fullMobile>
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
      return <CustomTextField {...propsToPass} />;
    case 'number':
      return <CustomTextField {...propsToPass} />;
    case 'checkbox':
      return <CustomCheckBox checked={value} {...propsToPass} />;
    default:
      return null;
  }
};
