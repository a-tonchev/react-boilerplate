import { DotsThreeVerticalIcon } from '@phosphor-icons/react';

import { useIsAdmin, useLoggedIn, useUserData } from '@/screens/users/hooks/userDataHooks';
import AuthHelper from '@/screens/auth/AuthHelper';

import { menu } from './DesktopMenu';

const MobileMenu = ({
  mobileMoreAnchorEl,
  handleMobileMenuClose,
  ...rest
}) => {
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const userData = useUserData();
  const loggedIn = useLoggedIn();
  const isAdmin = useIsAdmin();

  if (!isMobileMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="button"
      tabIndex={0}
      onClick={handleMobileMenuClose}
      onKeyDown={handleMobileMenuClose}
    >
      <div
        className={[
          'absolute bg-popover rounded-lg border',
          'shadow-lg min-w-[200px] py-1',
        ].join(' ')}
        style={{
          top: (mobileMoreAnchorEl?.getBoundingClientRect()?.bottom ?? 0) + 4,
          right: window.innerWidth - (mobileMoreAnchorEl?.getBoundingClientRect()?.right ?? 0),
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        role="presentation"
      >
        {menu.map((el, ind) => {
          const {
            component: Component,
            onClick,
            text,
            authorizations,
          } = el;
          if (authorizations && !AuthHelper.isAuthorized({ ...userData, isAdmin, loggedIn }, authorizations)) {
            return null;
          }
          return (
            <button
              type="button"
              key={`${ind}_${1}`}
              onClick={onClick ? rest[onClick] : undefined}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent transition-colors"
            >
              <Component />
              {text ? <span>{text}</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const MobileMenuSection = ({ handleMobileMenuOpen }) => (
  <div className="flex md:hidden">
    <button
      type="button"
      aria-label="show more"
      aria-haspopup="true"
      onClick={handleMobileMenuOpen}
      className="text-[#A0AEC0] rounded-lg p-2 hover:bg-white/10 hover:text-white transition-all"
    >
      <DotsThreeVerticalIcon size={22} weight="bold" />
    </button>
  </div>
);

export { MobileMenu, MobileMenuSection };
