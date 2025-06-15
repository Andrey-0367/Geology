import { ReactNode } from 'react';

export type TabType = {
  id: string;
  title: string;
  content: ReactNode | null; // Разрешено null для отсутствия контента
};

export type TabsProps = {
  tabs: TabType[];
  className?: string;
};