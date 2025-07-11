"use client";

import { useState, useRef } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./Footer.module.scss";
import ContactForm from "@/app/ui/components/ContactForm/ContactForm";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  const handleSuccess = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
       
        <p className={styles.copyright}>
          © {new Date().getFullYear()} МБО. Все права защищены
        </p>
      </div>
    </footer>
  );
}