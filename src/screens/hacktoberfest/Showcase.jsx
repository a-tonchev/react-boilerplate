import { useTranslation } from 'react-i18next';
import { Typography, Container } from '@mui/material';

import useClasses from '@/components/layout/hooks/useClasses';
import CustomForm from '@/components/forms/CustomForm';

const styles = {
  container: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
};

const elements = [
  {
    type: 'text',
    label: 'Name',
    defaultValue: '',
    placeholder: 'Your Name',
    required: true,
  },
  {
    type: 'number',
    label: 'Age',
    defaultValue: 18,
    placeholder: 'Your age here',
  },
  {
    type: 'textarea',
    label: 'Description',
    placeholder: 'Enter information about you here',
  },
  {
    type: 'checkbox',
    label: 'I Want advertising',
    defaultValue: false,
  },
  {
    type: 'checkbox',
    label: 'I agree with the Terms',
    defaultValue: false,
    required: true,
  },
];

const Showcase = () => {
  const { t } = useTranslation();
  const classes = useClasses(styles);

  return (
    <div>
      <Typography>{t('Components')}</Typography>
      {/* display here all your components */}
      <Container className={classes.container}>
        <CustomForm onSubmit={data => console.log(data)} elements={elements} />
      </Container>
    </div>
  );
};

export default Showcase;
