import { useTranslation } from 'react-i18next';

const ErrorText = ({ error, center, ...rest }) => {
  const { t } = useTranslation();
  return error ? (
    <p
      className={`text-sm text-destructive ${center ? 'text-center' : 'text-left'}`}
      {...rest}
    >
      {t(error)}
    </p>
  ) : null;
};

export default ErrorText;
