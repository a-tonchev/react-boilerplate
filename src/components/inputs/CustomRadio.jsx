import { useTranslation } from 'react-i18next';

import { RadioGroupItem } from '@/components/ui/radio-group';

const CustomRadio = ({
  label,
  name,
  onChange,
  error,
  checked,
  value,
  ...rest
}) => {
  const { t } = useTranslation();

  const handleChange = () => {
    onChange({ name, value: value || name });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={value || name}
          id={name}
          checked={checked}
          onClick={handleChange}
          aria-label={label}
          {...rest}
        />
        <label
          htmlFor={name}
          className="text-sm leading-none cursor-pointer"
        >
          {t(label)}
        </label>
      </div>
      {!!error && (
        <p className="mt-1.5 text-sm text-destructive">{t(error)}</p>
      )}
    </div>
  );
};

export default CustomRadio;
