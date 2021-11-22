import {
  InputBase,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: 'var(--theme-shape-borderRadius)',
    backgroundColor: 'var(--alpha-theme-palette-common-white-0-8)',
    '&:hover': {
      backgroundColor: 'var(--alpha-theme-palette-common-white-1)',
    },
    marginRight: 'var(--theme-spacing-2)',
    marginLeft: 0,
    width: '100%',
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
    color: 'black',
    zIndex: 100,
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: 'var(--theme-spacing-1_1_1_0)',
    // vertical padding + font size from searchIcon
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
        <SearchIcon />
      </div>
      <InputBase
        placeholder={`${t('search')}...`}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default HeaderSearch;
