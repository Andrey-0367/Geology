"use client";

import React, { useState, useEffect, useMemo } from 'react';
import TabsUI from './ui/TabsUI';
import { TabsProps, TabType } from './types';

const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  // Фильтруем вкладки: первая всегда отображается, остальные - только с контентом
  const validTabs = useMemo(() => {
    const result: TabType[] = [];
    
    // Всегда добавляем первую вкладку, даже если контент пустой
    if (tabs.length > 0) {
      result.push(tabs[0]);
    }
    
    // Добавляем остальные вкладки только если есть контент
    for (let i = 1; i < tabs.length; i++) {
      if (tabs[i].content) {
        result.push(tabs[i]);
      }
    }
    
    return result;
  }, [tabs]);

  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  useEffect(() => {
    // Активируем первую вкладку при монтировании, если она есть
    if (validTabs.length > 0) {
      setActiveTab(validTabs[0].id);
    } else {
      setActiveTab(null);
    }
  }, [validTabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(prev => prev === tabId ? null : tabId);
  };

  return (
    <TabsUI 
      tabs={validTabs}
      activeTab={activeTab}
      onTabClick={handleTabClick}
      className={className}
    />
  );
};

export default Tabs;