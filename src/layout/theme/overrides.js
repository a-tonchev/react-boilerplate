const overrides = {
  drawerPaper: {
    backgroundColor: 'rgb(17,70,128)',
    color: '#f8f8f8',
    MuiListItemIcon: {
      root: {
        color: 'white',
      },
    },
  },
  MuiSkeleton: {
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginTop: 5,
    },
    text: {
      transform: 'scale(1, 0.9)',
    },
  },
  drawerIcon: {
    color: '#f8f8f8',
  },
  MuiCardHeader: {
    action: {
      marginTop: '-4px',
      marginRight: '-4px',
    },
  },
  MuiPickersDay: {
    day: {
      fontWeight: '300',
    },
  },
  MuiButtonBase: {
    root: {
      outline: 0,
    },
  },
  MuiIconButton: {
    root: {
      outline: 'none',
    },
  },
  MuiPickersYear: {
    root: {
      height: '64px',
    },
  },
  MuiPickersCalendar: {
    transitionContainer: {
      marginTop: '6px',
    },
  },
  MuiPickersCalendarHeader: {
    iconButton: {
      backgroundColor: 'transparent',
      '& > *': {
        backgroundColor: 'transparent',
      },
      outline: 'none',
    },
    switchHeader: {
      marginTop: '2px',
      marginBottom: '4px',
    },
  },
  MuiPickersClock: {
    container: {
      margin: '32px 0 4px',
    },
  },
  MuiPickersClockNumber: {
    clockNumber: {
      left: 'calc(50% - 16px)',
      width: '32px',
      height: '32px',
    },
  },
  MuiPickerDTHeader: {
    dateHeader: {
      '& h4': {
        fontSize: '2.125rem',
        fontWeight: 400,
      },
    },
    timeHeader: {
      '& h3': {
        fontSize: '3rem',
        fontWeight: 400,
      },
    },
  },
  MuiPickersTimePicker: {
    hourMinuteLabel: {
      '& h2': {
        fontSize: '3.75rem',
        fontWeight: 300,
      },
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      '& h4': {
        fontSize: '2.125rem',
        fontWeight: 400,
      },
    },
  },
};

export default overrides;
