import {
  InputBase,
} from '@mui/material';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderColor: 'rgba(255,255,255,0.2)',
    },
    '&:focus-within': {
      borderColor: '#2dad67',
      backgroundColor: 'rgba(255,255,255,0.12)',
      boxShadow: '0 0 0 3px rgba(45, 173, 103, 0.15)',
    },
    marginRight: 'var(--theme-spacing-2)',
    marginLeft: 0,
    transition: 'all 0.15s ease',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'var(--theme-spacing-3)',
      width: 'auto',
    },
  },
  searchIcon: {
    padding: 'var(--theme-spacing-0_2)',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A0AEC0',
    zIndex: 100,
  },
  inputRoot: {
    color: '#E2E8F0',
    fontSize: '0.875rem',
  },
  inputInput: {
    padding: '8px 8px 8px 0',
    paddingLeft: 'var(--searchInput-paddingLeft)',
    transition: 'var(--theme-transitions-create-width)',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
});

const HeaderSearch = () => {
  const classes = useClasses(styles);
  const { t } = useTranslation();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <MagnifyingGlassIcon size={18} weight="regular" />
      </div>
      <InputBase
        placeholder={`${t('search')}...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search', autoComplete: 'off' }}
      />
    </div>
  );
};

export default HeaderSearch;
