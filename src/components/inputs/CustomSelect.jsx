import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

const CustomSelect = ({
  label,
  value,
  onChange,
  error,
  name,
  fullWidth = true,
  options = [],
  className,
  ...rest
}) => {
  const { t } = useTranslation();

  const handleChange = e => {
    const { value: val } = e.target;
    onChange({ name, value: val });
  };

  return (
    <div className={cn('mt-1', fullWidth && 'w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-muted-foreground mb-1.5"
        >
          {t(label)}
        </label>
      )}
      <select
        id={name}
        value={value}
        onChange={handleChange}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-card px-3 py-2 text-sm',
          'transition-colors focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring disabled:cursor-not-allowed',
          'disabled:opacity-50 appearance-none',
          error ? 'border-destructive' : 'border-input',
        )}
        {...rest}
      >
        {options.map(({
          key, value: optionValue, text, ...optionProps
        }) => (
          <option key={key || optionValue} value={optionValue} {...optionProps}>
            {t(text)}
          </option>
        ))}
      </select>
      {!!error && (
        <p className="mt-1.5 text-sm text-destructive">{t(error)}</p>
      )}
    </div>
  );
};

export default CustomSelect;
