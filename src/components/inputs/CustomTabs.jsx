import { useEffect, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const CustomTabs = ({ tabs, onChange, activeTab = 0 }) => {
  const [value, setValue] = useState(String(activeTab));

  useEffect(() => {
    setValue(String(activeTab));
  }, [activeTab]);

  const handleChange = newValue => {
    setValue(newValue);
    onChange(Number(newValue));
  };

  return (
    <div className="flex-grow">
      <Tabs value={value} onValueChange={handleChange}>
        <TabsList aria-label="Edit item tabs">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={`${index}-tab`}
              value={String(index)}
              className={cn(
                tab.containErrors && 'border border-destructive',
              )}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
