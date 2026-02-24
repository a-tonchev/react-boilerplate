import {
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  IconButton,
  ListItemButton,
  Box,
  Typography,
} from '@mui/material';
import {
  CaretLeftIcon,
  LockIcon,
  HouseIcon,
  UserCircleIcon,
  BrowserIcon,
  UsersThreeIcon,
  GlobeIcon,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

import Authorized from '@/screens/auth/Authorized';
import CustomLink from '@/components/inputs/CustomLink';
import UrlEnums from '@/components/connections/enums/UrlEnums';

const listItemSx = {
  borderRadius: '8px',
  mx: 1,
  mb: 0.5,
  color: '#A0AEC0',
  '&:hover': {
    backgroundColor: 'rgba(45, 173, 103, 0.1)',
    color: '#FFFFFF',
    '& .MuiListItemIcon-root': {
      color: '#2dad67',
    },
  },
};

const listItemIconSx = {
  color: '#718096',
  minWidth: 40,
};

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          minHeight: 64,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#FFFFFF',
            fontSize: '1.1rem',
            letterSpacing: '-0.01em',
          }}
        >
          {t('app.title')}
        </Typography>
        <IconButton size="small" sx={{ color: '#A0AEC0', '&:hover': { color: '#FFFFFF' } }}>
          <CaretLeftIcon size={20} weight="bold" />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <List sx={{ px: 0.5, py: 1 }}>
        <CustomLink plain to={UrlEnums.MAIN}>
          <ListItemButton key="home" sx={listItemSx}>
            <ListItemIcon sx={listItemIconSx}>
              <HouseIcon size={20} weight="regular" />
            </ListItemIcon>
            <ListItemText
              primary={t('home')}
              slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
            />
          </ListItemButton>
        </CustomLink>
        <Authorized publicOnly>
          <CustomLink plain to={UrlEnums.LOGIN}>
            <ListItemButton key="login" sx={listItemSx}>
              <ListItemIcon sx={listItemIconSx}>
                <LockIcon size={20} weight="regular" />
              </ListItemIcon>
              <ListItemText
                primary={t('login')}
                slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
              />
            </ListItemButton>
          </CustomLink>
        </Authorized>
        <Authorized authenticated>
          <CustomLink plain to={UrlEnums.PROFILE}>
            <ListItemButton key="profile" sx={listItemSx}>
              <ListItemIcon sx={listItemIconSx}>
                <UserCircleIcon size={20} weight="regular" />
              </ListItemIcon>
              <ListItemText
                primary={t('profile')}
                slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
              />
            </ListItemButton>
          </CustomLink>
          <ListItemButton key="myPages" sx={listItemSx}>
            <ListItemIcon sx={listItemIconSx}>
              <BrowserIcon size={20} weight="regular" />
            </ListItemIcon>
            <ListItemText
              primary={t('pages.my')}
              slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
            />
          </ListItemButton>
        </Authorized>
        <Authorized adminOnly>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 1 }} />
          <CustomLink plain to={UrlEnums.ALL_USERS}>
            <ListItemButton key="allUsers" sx={listItemSx}>
              <ListItemIcon sx={listItemIconSx}>
                <UsersThreeIcon size={20} weight="regular" />
              </ListItemIcon>
              <ListItemText
                primary={t('users.all')}
                slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
              />
            </ListItemButton>
          </CustomLink>
          <CustomLink plain to={UrlEnums.MAIN}>
            <ListItemButton key="allPages" sx={listItemSx}>
              <ListItemIcon sx={listItemIconSx}>
                <GlobeIcon size={20} weight="regular" />
              </ListItemIcon>
              <ListItemText
                primary={t('pages.all')}
                slotProps={{ primary: { sx: { fontSize: '0.875rem', fontWeight: 500 } } }}
              />
            </ListItemButton>
          </CustomLink>
        </Authorized>
      </List>
    </>
  );
};

export default Sidebar;
