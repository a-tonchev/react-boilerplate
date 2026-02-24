import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useClasses from '@/components/layout/hooks/useClasses';

const StyledTabs = styled(props => (
  <Tabs
    variant="scrollable"
    scrollButtons="auto"
    {...props}
    TabIndicatorProps={{ children: <span /> }}
  />
))(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const StyledTab = styled(({ containErrors, ...rest }) => (
  <Tab
    style={{
      border: containErrors
        ? '1px solid red'
        : 'none',
    }}
    disableRipple
    {...rest}
  />
))(({ theme }) => ({
  textTransform: 'none',
  color: '#000',
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&:focus': {
    opacity: 1,
  },
}));

const styles = {
  root: {
    flexGrow: 1,
  },
};

const CustomTabs = ({ tabs, onChange, activeTab = 0 }) => {
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
};

export default CustomTabs;
