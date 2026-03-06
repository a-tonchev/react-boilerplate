import { useTranslation } from 'react-i18next';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const CustomCheckBox = ({
  label,
  name,
  value,
  onChange,
  error,
  fullWidth,
  ...rest
}) => {
  const { t } = useTranslation();

  const handleChange = checked => {
    onChange({ name, value: checked });
  };

  const labelToShow = typeof label === 'string' ? t(label) : label;

  return (
    <div className="mt-2">
      <div className={cn('flex items-center space-x-2', fullWidth && 'w-full')}>
        <Checkbox
          id={name}
          checked={value}
          onCheckedChange={handleChange}
          name={name}
          {...rest}
        />
        <label
          htmlFor={name}
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {labelToShow}
        </label>
      </div>
      {!!error && (
        <p className="mt-1.5 text-sm text-destructive">{t(error)}</p>
      )}
    </div>
  );
};

export default CustomCheckBox;
