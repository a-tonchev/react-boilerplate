import { useState } from 'react';
import {
  FormHelperText, InputAdornment, TextField, IconButton,
} from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = {
  success: {
    '& input:valid + fieldset': {
      borderColor: '#2dad67',
    },
  },
};

const CustomTextField = (
  {
    label,
    name,
    fieldName,
    value,
    onChange,
    error,
    valid,
    endText,
    type,
    ...rest
  },
) => {
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

  const classes = useClasses(styles);

  const endAdornment = isPassword ? (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setShowPassword(prev => !prev)}
        onMouseDown={e => e.preventDefault()}
        edge="end"
        size="small"
        sx={{ color: '#718096' }}
      >
        {showPassword
          ? <EyeSlashIcon size={20} weight="regular" />
          : <EyeIcon size={20} weight="regular" />}
      </IconButton>
    </InputAdornment>
  ) : (
    !!endText && <InputAdornment position="end">{endText}</InputAdornment>
  );

  return (
    <>
      <TextField
        label={t(label)}
        name={name}
        aria-label={t('textInput')}
        className={valid ? classes.success : ''}
        variant="outlined"
        fullWidth
        value={value}
        onChange={handleChange}
        error={!!error}
        margin="normal"
        type={isPassword && showPassword ? 'text' : type}
        slotProps={{
          input: { endAdornment },
        }}
        {...rest}
      />
      {!!error && (
      <FormHelperText
        error={!!error}
      >
        {t(error)}
      </FormHelperText>
      )}
    </>
  );
};

export default CustomTextField;
