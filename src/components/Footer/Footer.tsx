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
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.contactButton}
          aria-label="Открыть форму обратной связи"
        >
          Написать нам
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className={styles.modalForm} ref={modalRef}>
            <h2 className={styles.modalTitle}>Обратная связь</h2>
            <ContactForm 
              onSuccess={handleSuccess}
              customStyles={{
                form: styles.contactForm,
                input: styles.formInput,
                textarea: styles.formTextarea,
                submitButton: styles.formSubmitButton
              }}
            />
          </div>
        </Modal>
        
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Geology. Все права защищены
        </p>
      </div>
    </footer>
  );
}