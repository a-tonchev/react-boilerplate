import { useTranslation } from 'react-i18next';

const CustomCodeBlock = ({ text, code }) => {
  const { t } = useTranslation();
  return (
    <>
      <br />
      <p className="text-sm">{t(text)}</p>
      <pre
        className={[
          'block p-2.5 my-2.5 text-[13px] leading-relaxed text-[#333]',
          'break-all bg-[#f8f8f8] border border-[#ccc] rounded whitespace-pre-wrap',
        ].join(' ')}
      >
        <code>{code}</code>
      </pre>
    </>
  );
};

export default CustomCodeBlock;
