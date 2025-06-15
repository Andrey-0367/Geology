import { ReactNode } from 'react';

export type TabType = {
  id: string;
  title: string;
  content: ReactNode | null; 
};

export type TabsProps = {
  tabs: TabType[];
  className?: string;
};