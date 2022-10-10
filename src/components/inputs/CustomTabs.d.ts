export = CustomTabs;

type CustomTabsProps = {
    tabs: { name: string; containErrors?: boolean };
    onChange: ({ event, newValue }: { event: React.SyntheticEvent; newValue: number }) => void;
    activeTab: number;
};

/**
 * Wrapper around MUI <Tabs> and <Tab> with custom styles
 * Use with <TabPanel> and a handleChange function
 * @param tabs At least two properties: name and containErrors
 * @param onChange Returns {event, newValue} where newValue is the new tab index
 * @param activeTab Index of current tab
 */
declare function CustomTabs({ tabs, onChange, activeTab = 0 }: CustomTabsProps): React.ReactElement;
