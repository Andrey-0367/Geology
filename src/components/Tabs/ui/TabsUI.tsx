import React from 'react';
import styles from './TabsUI.module.scss';
import { TabsUIProps } from './types';

const TabsUI: React.FC<TabsUIProps> = ({
  tabs,
  activeTab,
  onTabClick,
  className
}) => {
  // Если нет вкладок, возвращаем null
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.tabsContainer} ${className || ''}`}>
      <div className={styles.tabsButtons}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabClick(tab.id)}
            aria-expanded={activeTab === tab.id}
            aria-controls={`tab-content-${tab.id}`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {tabs.map(tab => (
        <div 
          key={`content-${tab.id}`}
          id={`tab-content-${tab.id}`}
          className={`${styles.tabContent} ${activeTab === tab.id ? styles.active : ''}`}
          role="region"
          aria-labelledby={`tab-button-${tab.id}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default TabsUI;