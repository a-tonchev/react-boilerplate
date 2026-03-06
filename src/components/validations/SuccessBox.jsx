import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SuccessBox = ({ text, button }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mt-16 flex flex-col items-center">
        <Check className="text-success m-4 h-16 w-16" />
        <h5 className="text-center text-lg font-semibold">{t(text)}</h5>
        {button || ''}
      </div>
    </div>
  );
};

export default SuccessBox;
