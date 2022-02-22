import { FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ErrorText = ({ error, center, ...rest }) => {
  const { t } = useTranslation();
  return (error ? (
    <FormHelperText
      error
      style={{
        textAlign: center ? 'center' : 'left',
      }}
      {...rest}
    >
      {t(error)}
    </FormHelperText>
  ) : null);
};

export default ErrorText;
