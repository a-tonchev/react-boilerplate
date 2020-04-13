import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../contexts/UserContext';

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
  const { dispatchUserData } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const handleChange = event => {
    dispatchUserData({
      language: event.target.value,
      type: 'CHANGE_LANGUAGE',
    });
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
          <MenuItem value="en">{t('EN')}</MenuItem>
          <MenuItem value="de">{t('DE')}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguagesPicker;
