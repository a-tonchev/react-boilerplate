const components = {
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: {
        color: '#2dad67',
        fontWeight: 500,
        '&:hover': {
          color: '#249457',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      containedPrimary: {
        borderRadius: '10px',
        height: '50px',
        textTransform: 'none',
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: '0.025em',
        backgroundColor: '#2D3748',
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
        '&:hover': {
          backgroundColor: '#1A202C',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        backgroundColor: '#FFFFFF',
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CBD5E0',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#2dad67',
          borderWidth: '2px',
        },
      },
      notchedOutline: {
        borderColor: '#E2E8F0',
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      standardError: {
        borderRadius: '10px',
        backgroundColor: '#FFF5F5',
        color: '#C53030',
        border: '1px solid #FED7D7',
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#E2E8F0',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#2D3748',
        color: '#E2E8F0',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: '#1A202C',
        color: '#E2E8F0',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)',
        marginTop: '4px',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        margin: '2px 6px',
        padding: '8px 12px',
        '&:hover': {
          backgroundColor: '#F0FFF4',
        },
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      colorSecondary: {
        backgroundColor: '#2dad67',
        color: '#FFFFFF',
      },
    },
  },
};

export default components;
