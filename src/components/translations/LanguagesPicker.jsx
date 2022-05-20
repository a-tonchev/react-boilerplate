import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

import { useSetLanguage } from '@/screens/users/hooks/languageHook';
import useClasses from '@/components/layout/hooks/useClasses';

function checkColor(color = '#000') {
  let result = null;
  if (color !== 'light' && color !== 'dark') {
    if (color.substring(0, 1) === '#' && (color.length === 4 || color.length === 7)) {
      result = color;
    }
  } else {
    result = color === 'light' ? '#fff' : '#000';
  }
  if (result === null) result = '#000';
  return result;
}

const LanguagesPicker = props => {
  const { color = 'light', mobileColor } = props;
  const lColor = checkColor(color);
  const mColor = checkColor(mobileColor);

  const styles = theme => ({
    formControl: {
      margin: 'var(--theme-spacing-1)',
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: 'var(--theme-spacing-2)',
    },
    select: {
      color: lColor,
      '&:before': {
        borderBottomColor: `${lColor} !important`,
      },
      [theme.breakpoints.down('sm')]: {
        color: mColor,
        '&:before': {
          borderBottomColor: `${mColor} !important`,
        },
      },
    },
    selectIcon: {
      color: lColor,
      [theme.breakpoints.down('sm')]: {
        color: mColor,
      },
    },
  });

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
    <Box>
      <FormControl className={classes.formControl}>
        <Select
          labelId="language-chooser-label"
          id="language-chooser"
          variant="standard"
          value={lang}
          onChange={handleChange}
          className={classes.select}
          classes={
                        {
                          icon: classes.selectIcon,
                        }
                    }
        >
          <MenuItem value="en">{t('EN')}</MenuItem>
          <MenuItem value="de">{t('DE')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguagesPicker;
