import BasicConfig from '@/components/config/BasicConfig';
import LanguagesPicker from '@/components/translations/LanguagesPicker';
import Footer from '@/components/layout/footer/Footer';
import LegalButtonGroup from '@/components/inputs/LeagalButtonGroup';

export default function LoginLayout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <div
        className="hidden sm:block sm:w-1/3 md:w-7/12 lg:w-2/3 bg-cover bg-center relative"
        style={{ backgroundImage: BasicConfig.loginImage }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(26,32,44,0.15)] to-[rgba(45,55,72,0.3)]" />
      </div>
      <div className="flex flex-col w-full sm:w-2/3 md:w-5/12 lg:w-1/3 bg-background border-l border-border">
        <div className="flex justify-end px-4 py-2 border-b border-border">
          <LanguagesPicker />
        </div>
        <div className="flex-1 flex items-center px-6 sm:px-12">
          <div className="w-full max-w-[420px] mx-auto">
            {children}
          </div>
        </div>
        <div className="flex flex-col items-center pb-5 pt-2 gap-2">
          <LegalButtonGroup />
          <Footer href={BasicConfig.copyright.url}>{BasicConfig.copyright.text}</Footer>
        </div>
      </div>
    </div>
  );
}
