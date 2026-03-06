import {
  CaretLeftIcon,
  LockIcon,
  HouseIcon,
  UserCircleIcon,
  BrowserIcon,
  UsersThreeIcon,
  GlobeIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <CustomLink plain to={to}>
    <button
      type="button"
      className={[
        'flex items-center gap-3 w-full rounded-lg mx-1 mb-0.5 px-3 py-2',
        'text-[#A0AEC0] hover:bg-[rgba(45,173,103,0.1)] hover:text-white',
        'text-sm font-medium transition-colors cursor-pointer',
      ].join(' ')}
    >
      <Icon size={20} weight="regular" className="text-[#718096]" />
      {label}
    </button>
  </CustomLink>
);

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">
        <span className="font-bold text-white text-[1.1rem] tracking-tight">
          {t('app.title')}
        </span>
        <button type="button" className="text-[#A0AEC0] hover:text-white p-1">
          <CaretLeftIcon size={20} weight="bold" />
        </button>
      </div>
      <div className="h-px bg-white/[0.08]" />
      <nav className="px-1 py-2">
        <SidebarItem icon={HouseIcon} label={t('home')} to={UrlEnums.MAIN} />
        <Authorized publicOnly>
          <SidebarItem icon={LockIcon} label={t('login')} to={UrlEnums.LOGIN} />
        </Authorized>
        <Authorized authenticated>
          <SidebarItem icon={UserCircleIcon} label={t('profile')} to={UrlEnums.PROFILE} />
          <button
            type="button"
            className={[
              'flex items-center gap-3 w-full rounded-lg mx-1 mb-0.5',
              'px-3 py-2 text-[#A0AEC0]',
              'hover:bg-[rgba(45,173,103,0.1)] hover:text-white',
              'text-sm font-medium transition-colors cursor-pointer',
            ].join(' ')}
          >
            <BrowserIcon size={20} weight="regular" className="text-[#718096]" />
            {t('pages.my')}
          </button>
        </Authorized>
        <Authorized adminOnly>
          <div className="h-px bg-white/[0.08] my-2" />
          <SidebarItem icon={UsersThreeIcon} label={t('users.all')} to={UrlEnums.ALL_USERS} />
          <SidebarItem icon={GlobeIcon} label={t('pages.all')} to={UrlEnums.MAIN} />
        </Authorized>
      </nav>
    </>
  );
};

export default Sidebar;
