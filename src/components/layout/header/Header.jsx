import { useState } from 'react';

import Drawer from '../sidebar/Drawer';
import { MobileMenu, MobileMenuSection } from './MobileMenu';
import { ProfileMenu, DesktopMenuSection } from './DesktopMenu';
import HeaderLogo from './HeaderLogo';
import HeaderSearch from './HeaderSearch';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-40 bg-primary border-b border-white/[0.08]">
        <div className="flex items-center px-2 sm:px-4 gap-1 h-16">
          <Drawer />
          <HeaderLogo />
          <HeaderSearch />
          <div className="flex-grow" />
          <DesktopMenuSection
            handleProfileMenuOpen={handleProfileMenuOpen}
          />
          <MobileMenuSection
            handleMobileMenuOpen={handleMobileMenuOpen}
          />
        </div>
      </header>
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />
      <ProfileMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
};

export default Header;
