import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

import { useSetLanguage } from '@/screens/users/hooks/languageHook';
import useClasses from '@/components/layout/hooks/useClasses';

const styles = theme => ({
  formControl: {
    margin: 'var(--theme-spacing-1)',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 'var(--theme-spacing-2)',
  },
  select: {
    color: 'white',
    '&:before': {
      borderBottomColor: 'white !Important',
    },
    [theme.breakpoints.down('md')]: {
      color: 'black',
      '&:before': {
        borderBottomColor: 'black !Important',
      },
    },
  },
  selectIcon: {
    color: 'white',
    [theme.breakpoints.down('md')]: {
      color: 'black',
    },
  },
});

const LanguagesPicker = () => {
  const classes = useClasses(styles);
  const changeLanguage = useSetLanguage();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const handleChange = event => {
    changeLanguage(event.target.value);
    setLang(event.target.value);
  };
  const { language } = i18n;
  useEffect(() => {
    setLang(language);
  }, [language]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          value={lang}
          onChange={handleChange}
          className={classes.select}
          classes={
                        {
                          icon: classes.selectIcon,
                        }
                    }
        >
          <MenuItem value="en">{t('en')}</MenuItem>
          <MenuItem value="de">{t('de')}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguagesPicker;
