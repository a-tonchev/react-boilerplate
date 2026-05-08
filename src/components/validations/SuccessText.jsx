import { useTranslation } from 'react-i18next';

const SuccessText = ({ text, center, ...rest }) => {
  const { t } = useTranslation();
  return text ? (
    <p
      className={`text-sm text-success ${center ? 'text-center' : 'text-left'}`}
      {...rest}
    >
      {t(text)}
    </p>
  ) : <div />;
};

export default SuccessText;
