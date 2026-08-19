import {
  ChevronLeft,
  Lock,
  House,
  CircleUserRound,
  AppWindow,
  Users,
  Globe,
} from 'lucide-react';
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
        'text-sidebar-muted hover:bg-sidebar-accent hover:text-white',
        'text-sm font-medium transition-colors cursor-pointer',
      ].join(' ')}
    >
      <Icon size={20} className="text-sidebar-muted" />
      {label}
    </button>
  </CustomLink>
);

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">
        <span className="font-bold text-white text-lg tracking-tight">
          {t('app.title')}
        </span>
        <button type="button" className="text-sidebar-muted hover:text-white p-1">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
      </div>
      <div className="h-px bg-white/[0.08]" />
      <nav className="px-1 py-2">
        <SidebarItem icon={House} label={t('home')} to={UrlEnums.MAIN} />
        <Authorized publicOnly>
          <SidebarItem icon={Lock} label={t('login')} to={UrlEnums.LOGIN} />
        </Authorized>
        <Authorized authenticated>
          <SidebarItem icon={CircleUserRound} label={t('profile')} to={UrlEnums.PROFILE} />
          <button
            type="button"
            className={[
              'flex items-center gap-3 w-full rounded-lg mx-1 mb-0.5',
              'px-3 py-2 text-sidebar-muted',
              'hover:bg-sidebar-accent hover:text-white',
              'text-sm font-medium transition-colors cursor-pointer',
            ].join(' ')}
          >
            <AppWindow size={20} className="text-sidebar-muted" />
            {t('pages.my')}
          </button>
        </Authorized>
        <Authorized adminOnly>
          <div className="h-px bg-white/[0.08] my-2" />
          <SidebarItem icon={Users} label={t('users.all')} to={UrlEnums.ALL_USERS} />
          <SidebarItem icon={Globe} label={t('pages.all')} to={UrlEnums.MAIN} />
        </Authorized>
      </nav>
    </>
  );
};

export default Sidebar;
