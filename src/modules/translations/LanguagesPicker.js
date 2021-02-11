import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';
import { useSetLanguage } from '../../components/users/hooks/languageHook';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    color: 'white',
    '&:before': {
      borderBottomColor: 'white !Important',
    },
    [theme.breakpoints.down('sm')]: {
      color: 'black',
      '&:before': {
        borderBottomColor: 'black !Important',
      },
    },
  },
  selectIcon: {
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      color: 'black',
    },
  },
}));

const LanguagesPicker = () => {
  const classes = useStyles();
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
