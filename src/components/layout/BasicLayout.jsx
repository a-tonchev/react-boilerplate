import { useLocation } from 'react-router-dom';

import BasicConfig from '@/components/config/BasicConfig';

import Header from './header/Header';
import Footer from './footer/Footer';

const BasicLayout = ({ children }) => {
  const location = useLocation();

  function checkRegExp(arr) {
    return arr.some(regexp => regexp.test(location.pathname));
  }

  const noLayout = checkRegExp(
    [/^\/login/, /^\/signUp/, /^\/passwordRecovery/, /^\/forgetPassword/, /^\/resetPassword/, /^\/logout/],
  );
  const fullSizeContent = checkRegExp([/^\/previewSpeedPage/]);

  return noLayout ? (children)
    : (
      <div className="flex bg-background min-h-screen">
        <Header />
        <div className="flex-1 mt-[84px] max-sm:mt-14">
          <div className={`mx-auto px-4 grid grid-rows-[1fr] ${fullSizeContent ? 'max-w-full' : 'max-w-screen-lg'}`}>
            {children}
            <Footer
              href={BasicConfig.copyright.url}
            >
              {BasicConfig.copyright.text}
            </Footer>
          </div>
        </div>
      </div>
    );
};

export default BasicLayout;
