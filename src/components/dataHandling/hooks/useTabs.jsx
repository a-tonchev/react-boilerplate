import { useState, useEffect } from 'react';

import CustomTabs from '@/components/inputs/CustomTabs';
import UrlHelper from '@/components/connections/UrlHelper';

const useTabs = ({ tabs, tabName = 'tab' }) => {
  const [activeTab, setActiveTab] = useState(0);

  const queryTab = UrlHelper.getIntParam('tab', 0);

  useEffect(() => {
    setActiveTab(queryTab ?? 0);
  }, [queryTab]);

  const handleChange = newActiveTab => {
    setActiveTab(newActiveTab);
    UrlHelper.setParam(tabName, newActiveTab);
  };

  const TabsComponent = <CustomTabs activeTab={activeTab} tabs={tabs} onChange={handleChange} />;

  return {
    activeTab,
    TabsComponent,
  };
};

export default useTabs;
