import { useState } from 'react';
import {
  Tabs, Tab, Box, Paper, Typography,
} from '@mui/material';
import { UserCircleIcon, ShieldCheckIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';

const TabPanel = ({
  children, value, index, ...other
}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
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
    <Box sx={{
      width: '100%', maxWidth: 800, mx: 'auto', py: 4, px: { xs: 2, sm: 3 },
    }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
          letterSpacing: '-0.01em',
        }}
      >
        {t('profile')}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="profile tabs"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              color: '#718096',
              minHeight: 52,
              gap: 1,
              '&.Mui-selected': {
                color: '#2D3748',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2dad67',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab
            icon={<UserCircleIcon size={18} weight="regular" />}
            iconPosition="start"
            label={t('editProfile')}
          />
          <Tab
            icon={<ShieldCheckIcon size={18} weight="regular" />}
            iconPosition="start"
            label={t('Security')}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <EditProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UpdatePassword />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Profile;
