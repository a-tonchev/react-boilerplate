import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StyledTabs = withStyles(theme => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(
  props => (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      {...props}
      TabIndicatorProps={{ children: <span /> }}
    />
  ),
);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#000',
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))(({ containErrors, ...rest }) => (
  <Tab
    style={{
      border: containErrors
        ? '1px solid red'
        : 'none',
    }}
    disableRipple
    {...rest}
  />
));

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function CustomTabs({ tabs, onChange, activeTab = 0 }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(activeTab);
  }, [activeTab]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={classes.root}>
      <StyledTabs value={value} onChange={handleChange} aria-label="Edit item tabs">
        {tabs.map((tab, index) => (
          <StyledTab
            containErrors={tab.containErrors}
            key={`${index}-tab`}
            label={tab.name}
          />
        ))}
      </StyledTabs>
    </div>
  );
}
