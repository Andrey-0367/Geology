import { TabType } from '../types';

export type TabsUIProps = {
  tabs: TabType[];
  activeTab: string | null;
  onTabClick: (tabId: string) => void;
  className?: string;
};