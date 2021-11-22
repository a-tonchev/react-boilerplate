import { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useClasses from '@/components/layout/hooks/useClasses';

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

const styles = {
  root: {
    flexGrow: 1,
  },
};

export default function CustomTabs({ tabs, onChange, activeTab = 0 }) {
  const classes = useClasses(styles);
  const [value, setValue] = useState(0);

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
