"use client";

import { FC, ReactNode } from 'react';
import BackButton from "./components/BackButton";
import styles from "./layout.module.scss"

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <BackButton />
      <div className={`${styles.content}`}>
        {children}
      </div>
    </div>
  );
}

export default Layout;