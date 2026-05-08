import {
  UserCircleIcon,
  EnvelopeSimpleIcon,
  BellIcon,
  UserIcon,
  GearIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import LanguagesPicker from '@/components/translations/LanguagesPicker';
import i18n from '@/components/translations/i18n';
import { Badge } from '@/components/ui/badge';
import { createRipple } from '@/lib/utils';

const iconButtonClass = 'text-sidebar-muted rounded-lg p-2 transition-all'
  + ' hover:bg-white/10 hover:text-white cursor-pointer relative overflow-hidden';

const menu = [
  {
    component: () => <LanguagesPicker />,
  },
  {
    authorizations: { authenticated: true },
    component: () => (
      <span className="relative">
        <button
          type="button"
          aria-label="show 4 new mails"
          onClick={createRipple}
          className={iconButtonClass}
        >
          <EnvelopeSimpleIcon size={22} weight="regular" />
        </button>
        <Badge
          variant="secondary"
          className={
            'absolute -top-1.5 -right-2 h-5 min-w-5'
            + ' flex items-center justify-center'
            + ' text-xs px-1.5 pointer-events-none'
          }
        >
          4
        </Badge>
      </span>
    ),
    text: i18n.t('messages'),
  },
  {
    authorizations: { authenticated: true },
    component: () => (
      <span className="relative">
        <button
          type="button"
          aria-label="show 17 new notifications"
          onClick={createRipple}
          className={iconButtonClass}
        >
          <BellIcon size={22} weight="regular" />
        </button>
        <Badge
          variant="secondary"
          className={
            'absolute -top-1.5 -right-2 h-5 min-w-5'
            + ' flex items-center justify-center'
            + ' text-xs px-1.5 pointer-events-none'
          }
        >
          17
        </Badge>
      </span>
    ),
    text: i18n.t('notifications'),
  },
  {
    component: ({ onClick }) => (
      <button
        type="button"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={e => { createRipple(e); onClick(e); }}
        className={iconButtonClass}
      >
        <UserCircleIcon size={24} weight="regular" />
      </button>
    ),
    onClick: 'handleProfileMenuOpen',
    text: i18n.t('profile'),
  },
];

const ProfileMenu = ({
  anchorEl,
  handleMenuClose,
}) => {
  const isMenuOpen = Boolean(anchorEl);
  const { t } = useTranslation();

  if (!isMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="button"
      tabIndex={0}
      onClick={handleMenuClose}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleMenuClose(e); }}
    >
      <div
        className={
          'absolute bg-popover rounded-lg border'
          + ' shadow-lg min-w-[200px] py-1'
        }
        style={{
          top: (anchorEl?.getBoundingClientRect()?.bottom ?? 0) + 4,
          right: window.innerWidth
            - (anchorEl?.getBoundingClientRect()?.right ?? 0),
        }}
        role="button"
        tabIndex={0}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
      >
        <Authorized authenticated>
          <CustomLink plain to="/profile">
            <button
              type="button"
              onClick={handleMenuClose}
              className={
                'flex items-center gap-3 w-full px-3 py-2 mx-1.5'
                + ' rounded-md text-sm hover:bg-accent'
                + ' transition-colors cursor-pointer'
              }
            >
              <UserIcon size={18} weight="regular" className="text-muted-foreground" />
              <span className="font-medium">{t('profile')}</span>
            </button>
          </CustomLink>
          <button
            type="button"
            onClick={handleMenuClose}
            className={
              'flex items-center gap-3 w-full px-3 py-2 mx-1.5'
              + ' rounded-md text-sm hover:bg-accent'
              + ' transition-colors cursor-pointer'
            }
          >
            <GearIcon size={18} weight="regular" className="text-muted-foreground" />
            <span className="font-medium">{t('Settings')}</span>
          </button>
          <div className="h-px bg-border my-1" />
          <CustomLink plain to="/logout">
            <button
              type="button"
              onClick={handleMenuClose}
              className={
                'flex items-center gap-3 w-full px-3 py-2 mx-1.5'
                + ' rounded-md text-sm hover:bg-accent'
                + ' transition-colors cursor-pointer'
              }
            >
              <SignOutIcon size={18} weight="regular" className="text-muted-foreground" />
              <span className="font-medium">{t('logout')}</span>
            </button>
          </CustomLink>
        </Authorized>
        <Authorized publicOnly>
          <CustomLink plain to="/login">
            <button
              type="button"
              onClick={handleMenuClose}
              className={
                'flex items-center gap-3 w-full px-3 py-2 mx-1.5'
                + ' rounded-md text-sm hover:bg-accent'
                + ' transition-colors cursor-pointer'
              }
            >
              <SignOutIcon size={18} weight="regular" className="text-muted-foreground" />
              <span className="font-medium">{t('login')}</span>
            </button>
          </CustomLink>
        </Authorized>
      </div>
    </div>
  );
};

const DesktopMenuSection = props => (
  <div className="hidden md:flex items-center gap-1">
    {menu.map((el, ind) => {
      const { component: Component, onClick, authorizations } = el;
      const { [onClick]: onClickFunction } = props;
      let WrappedComponent = onClick
        ? <Component key={`${ind}_${1}`} onClick={onClickFunction} />
        : <Component key={`${ind}_${1}`} />;
      if (authorizations) {
        WrappedComponent = (
          <Authorized key={`${ind}_${0}`} {...authorizations}>
            {WrappedComponent}
          </Authorized>
        );
      }
      return WrappedComponent;
    })}
  </div>
);

export { ProfileMenu, DesktopMenuSection, menu };
