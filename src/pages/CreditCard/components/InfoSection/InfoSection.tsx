import './InfoSection.scss';
import { Tabs } from '@pages/CreditCard/components/Tabs/Tabs';
import { tabs } from './tabs.consts';
import { useTabsStore } from '@store/tabsStore/useTabsStore';
export const InfoSection = () => {
  const activeTab = useTabsStore((state) => state.activeTab);
  return (
    <div className="info">
      <Tabs tabs={tabs} />
      {tabs[activeTab]?.content}
    </div>
  );
};
