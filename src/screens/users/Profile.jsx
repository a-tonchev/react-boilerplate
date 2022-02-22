import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';

const TabPanel = ({
  children, value, index, ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box component="span" p={3}>
        {children}
      </Box>
    )}
  </div>
);

const Profile = () => {
  const [value, setValue] = useState(0);

  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
        <Tab label={t('editProfile')} />
        <Tab label={t('Security')} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdatePassword />
      </TabPanel>
    </div>
  );
};

export default Profile;
