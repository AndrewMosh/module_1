import { useTabsStore } from '@store/tabsStore/useTabsStore';
import { TabsNavProps } from './tabs.types';
import './Tabs.scss';

export const Tabs: React.FC<TabsNavProps> = ({ tabs }) => {
  const activeTab = useTabsStore((state) => state.activeTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);

  return (
    <nav className="tabs__nav">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tabs__tab ${
            activeTab === index ? 'tabs__tab--active' : ''
          }`}
          onClick={() => setActiveTab(index)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
