import { Button, ButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useClasses from '@/components/layout/hooks/useClasses';

import UrlEnums from '../connections/enums/UrlEnums';

const styles = {
  buttonInGroup: {
    fontWeight: 'normal',
    fontSize: 'smaller',
    color: 'gray',
  },
};

export default function LegalButtonGroup() {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  return (
    <ButtonGroup variant="text" size="small" aria-label="small text button group">
      <Button
        className={classes.buttonInGroup}
        href={UrlEnums.IMPRINT}
      >{t('legal.imprint')}
      </Button>
      <Button
        className={classes.buttonInGroup}
        href={UrlEnums.PRIVACY_POLICY}
      >{t('legal.privacy')}
      </Button>
      <Button
        className={classes.buttonInGroup}
        href={UrlEnums.TERMS}
      >{t('legal.terms')}
      </Button>
    </ButtonGroup>
  );
}
