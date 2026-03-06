import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

const CustomTextField = ({
  label,
  name,
  fieldName,
  value,
  onChange,
  error,
  valid,
  endText,
  type,
  fullWidth,
  className,
  autoFocus,
  disabled,
  required,
  multiline,
  rows,
  ...rest
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleChange = e => {
    const { type: inputType } = e.target;
    let { value: val } = e.target;
    if (inputType && inputType === 'number') {
      val = parseFloat(val);
    }
    onChange({
      name: name || fieldName,
      fieldName: fieldName || name,
      value: val,
    });
  };

  const inputType = isPassword && showPassword ? 'text' : type;
  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <div className={cn('mt-4', fullWidth && 'w-full', className)}>
      {label && (
        <label
          htmlFor={name || fieldName}
          className="block text-sm font-medium text-muted-foreground mb-1.5"
        >
          {t(label)}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <InputTag
          id={name || fieldName}
          name={name}
          aria-label={t(label || 'textInput')}
          value={value}
          onChange={handleChange}
          type={multiline ? undefined : inputType}
          autoFocus={autoFocus}
          disabled={disabled}
          required={required}
          rows={multiline ? rows : undefined}
          className={cn(
            'flex w-full rounded-lg border ring-0 ring-ring bg-card px-3',
            'py-2.5 text-sm transition-all duration-200',
            'placeholder:text-muted-foreground focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50',
            multiline ? 'min-h-[80px] resize-y' : 'h-10',
            error ? 'border-destructive focus-visible:ring-destructive' : 'border-input',
            valid && 'border-secondary focus-visible:ring-secondary',
            (isPassword || endText) && 'pr-10',
          )}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            aria-label="toggle password visibility"
            onClick={() => setShowPassword(prev => !prev)}
            onMouseDown={e => e.preventDefault()}
            className={[
              'absolute right-3 top-1/2 -translate-y-1/2',
              'text-muted-foreground hover:text-foreground transition-colors',
            ].join(' ')}
          >
            {showPassword
              ? <EyeSlashIcon size={20} weight="regular" />
              : <EyeIcon size={20} weight="regular" />}
          </button>
        )}
        {!isPassword && !!endText && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {endText}
          </span>
        )}
      </div>
      {!!error && (
        <p className="mt-1.5 text-sm text-destructive">{t(error)}</p>
      )}
    </div>
  );
};

export default CustomTextField;
