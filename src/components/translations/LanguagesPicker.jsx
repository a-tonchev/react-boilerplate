import { useEffect, useState, useRef } from 'react';
import {
  Box,
  ButtonBase,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  ClickAwayListener,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  GlobeSimpleIcon,
  CaretDownIcon,
  CheckIcon,
} from '@phosphor-icons/react';

import { setLanguage } from '@/screens/users/stores/userStore';

const languages = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
];

const LanguagesPicker = () => {
  const changeLanguage = setLanguage;
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleSelect = code => {
    changeLanguage(code);
    setLang(code);
    setOpen(false);
  };

  const { language } = i18n;
  useEffect(() => {
    setLang(language);
  }, [language]);

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <Box sx={{ position: 'relative' }}>
      <ButtonBase
        ref={anchorRef}
        onClick={() => setOpen(prev => !prev)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.5,
          py: 0.75,
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: '#E2E8F0',
          transition: 'all 0.15s ease',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderColor: 'rgba(255,255,255,0.3)',
          },
        }}
      >
        <GlobeSimpleIcon size={16} weight="regular" />
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          {currentLang.flag}
        </Typography>
        <CaretDownIcon
          size={12}
          weight="bold"
          style={{
            transition: 'transform 0.15s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </ButtonBase>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'top left' }}>
            <Paper
              elevation={8}
              sx={{
                mt: 0.5,
                borderRadius: '10px',
                overflow: 'hidden',
                minWidth: 160,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList sx={{ py: 0.5 }}>
                  {languages.map(l => (
                    <MenuItem
                      key={l.code}
                      selected={l.code === lang}
                      onClick={() => handleSelect(l.code)}
                      sx={{
                        py: 1,
                        px: 2,
                        margin: '2px 4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: '6px',
                        '&.Mui-selected': {
                          backgroundColor: '#F7FAFC',
                          '&:hover': {
                            backgroundColor: '#EDF2F7',
                          },
                        },
                        '&:hover': {
                          backgroundColor: '#EDF2F7',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            color: 'text.secondary',
                            minWidth: 22,
                          }}
                        >
                          {l.flag}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {l.label}
                        </Typography>
                      </Box>
                      {l.code === lang && (
                        <CheckIcon size={16} weight="bold" color="#2dad67" />
                      )}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default LanguagesPicker;
