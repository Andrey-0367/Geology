import React from "react";
import styles from "./Title.module.scss";

export interface TitleProps {
  tag: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export const Title: React.FC<TitleProps> = ({
  tag: Tag,
  children,
  className,
  align = "center",
}) => (
  <Tag className={`${styles.Title} ${styles[Tag]} ${className || ""}`}>
    {children}
  </Tag>
);