import { useTranslation } from 'react-i18next';

const CustomCodeBlock = ({ text, code }) => {
  const { t } = useTranslation();
  return (
    <>
      <br />
      <p className="text-sm">{t(text)}</p>
      <pre
        className={[
          'block p-2.5 my-2.5 text-sm leading-relaxed text-foreground',
          'break-all bg-muted border border-border rounded whitespace-pre-wrap',
        ].join(' ')}
      >
        <code>{code}</code>
      </pre>
    </>
  );
};

export default CustomCodeBlock;
